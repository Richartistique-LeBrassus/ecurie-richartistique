import { defineQuery } from "next-sanity";
import { sanityFetch } from "../fetch";
import type { Order } from "@/sanity.types";

export async function getMyOrders(userId: string): Promise<Order[]> {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const MY_ORDERS_QUERY = defineQuery(`
    *[_type == "order" && clerkUserId == $userId] | order(orderDate desc) {
      ...,
      products[] {
        quantity,
        product->{
          _id,
          name,
          price,
          images,
          description
        }
      }
    }
  `);

  try {
    const orders = await sanityFetch<Order[]>(MY_ORDERS_QUERY, { userId });
    console.log("Fetched unviewed orders:", orders);
    return orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Error fetching orders");
  }
}