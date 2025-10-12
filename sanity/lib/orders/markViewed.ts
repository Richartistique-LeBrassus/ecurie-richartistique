import { NextResponse } from "next/server";
import { markOrderViewed } from "@/sanity/lib/orders/markOrderViewed";

export async function POST(req: Request) {
  try {
    const { orderIds } = await req.json();
    if (!orderIds || !Array.isArray(orderIds)) {
      return NextResponse.json({ error: "Invalid orderIds" }, { status: 400 });
    }

    await Promise.all(orderIds.map((id) => markOrderViewed(id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking orders viewed:", error);
    return NextResponse.json({ error: "Failed to mark orders viewed" }, { status: 500 });
  }
}