import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache"; 

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("❌ Stripe webhook secret not set.");
    return NextResponse.json({ error: "Webhook secret not set" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err);
    return NextResponse.json({ error: `Webhook Error: ${err}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("✅ Checkout session received:", session.id);

    const metadata = session.metadata as Metadata | undefined;

    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
        limit: 100,
      });

      const products =
        lineItems.data
          ?.map((item) => {
            const stripeProduct = item.price?.product as Stripe.Product;
            const sanityProductId = stripeProduct?.metadata?.id;

            if (!sanityProductId) {
              console.warn(`⚠️ Skipping item without sanityProductId: ${stripeProduct?.id}`);
              return null;
            }

            return {
              _key: uuidv4(),
              product: { _ref: sanityProductId },
              quantity: item.quantity || 1,
            };
          })
          .filter(Boolean) || [];

      const safeOrder = {
        _type: "order",
        orderNumber: metadata?.orderNumber || "N/A",
        stripeCheckoutSessionId: session.id,
        stripeCustomerId: (session.customer as string) || "guest_customer",
        clerkUserId: metadata?.clerkUserId || "unknown",
        customerName:
          metadata?.customerName ||
          session.customer_details?.name ||
          "Guest",
        email:
          session.customer_details?.email ||
          metadata?.customerEmail ||
          "unknown@example.com",
        stripePaymentIntentId: (session.payment_intent as string) || "none",
        totalPrice: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency?.toUpperCase() || "EUR",
        amountDiscount: session.total_details?.amount_discount
          ? session.total_details.amount_discount / 100
          : 0,
        status: "paid",
        orderDate: new Date().toISOString(),
        products,
      };

      const order = await backendClient.create(safeOrder);
      console.log("✅ Order created in Sanity:", order);

      revalidatePath("/orders"); // ✅ this line makes sure the latest order shows once
    } catch (err) {
      console.error("❌ Failed to save order to Sanity:", err);
    }
  }
  return NextResponse.json({ received: true });
}