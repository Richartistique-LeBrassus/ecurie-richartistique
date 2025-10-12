"use server";
import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
import type { BasketItem } from "@/store/store";
import Stripe from "stripe";

export type Metadata = {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId: string; // ✅ ensures Clerk user ID is passed to Stripe
};

export type GroupedBasketItem = {
  product: BasketItem["product"];
  quantity: number;
};

export async function createCheckoutSession(
  items: GroupedBasketItem[],
  metadata: Metadata
) {
  try {
    // Ensure all items have a price
    const missingPrice = items.find((item) => !item.product.price);
    if (missingPrice)
      throw new Error(`Item "${missingPrice.product.name}" has no price`);

    // Check if customer exists in Stripe
    const customers = await stripe.customers.list({
      email: metadata.customerEmail,
      limit: 1,
    });

    const customerId =
      customers.data.length > 0 ? customers.data[0].id : undefined;

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_BASE_URL;

    const successUrl = `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`;
    const cancelUrl = `${baseUrl}/basket`;

    // Build line items with valid product references
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => ({
        price_data: {
          currency: "eur",
          unit_amount: Math.round(item.product.price! * 100),
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: `Product ID: ${item.product._id}`,
            metadata: { id: item.product._id },
            images:
              item.product.images && item.product.images.length > 0
                ? item.product.images.map((img) => imageUrl(img).url())
                : undefined,
          },
        },
        quantity: item.quantity,
      })
    );

    // ✅ Include Clerk user ID in Stripe metadata
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      customer_email: customerId ? undefined : metadata.customerEmail,
      metadata: {
        ...metadata,
        clerkUserId: metadata.clerkUserId, // ✅ ensures it's stored for webhook
        products: JSON.stringify(
          items.map((item) => ({
            id: item.product._id, // Sanity product ID
            quantity: item.quantity,
          }))
        ),
      },
      mode: "payment",
      allow_promotion_codes: true,
      success_url: successUrl,
      cancel_url: cancelUrl,
      line_items,
    });

    console.log("✅ Stripe session created:", session.id, "metadata:", session.metadata);

    return session.url;
  } catch (error) {
    console.error("❌ Error creating checkout session:", error);
    throw error;
  }
}