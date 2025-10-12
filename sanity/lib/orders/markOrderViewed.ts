import { writeClient } from "../writeClient";

export async function markOrderViewed(orderId: string) {
  try {
    const result = await writeClient
      .patch(orderId)
      .set({ viewed: true })
      .commit();
    console.log("✅ Marked order as viewed:", result._id);
  } catch (err) {
    console.error("❌ Failed to mark order viewed:", err);
  }
}