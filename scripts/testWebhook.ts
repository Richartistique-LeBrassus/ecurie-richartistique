import { backendClient } from "@/sanity/lib/backendClient";

async function main() {
  try {
    const result = await backendClient.create({
      _type: "order", 
      title: "Test Order",
      createdAt: new Date().toISOString(),
    });

    console.log("✅ Successfully created test order in Sanity:", result);
  } catch (error) {
    console.error("❌ Error creating test order:", error);
  }
}

main();