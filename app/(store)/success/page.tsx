"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useBasketStore from "@/store/store";
import DelayedPage from "@/components/ui/DelayedPage";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);

  useEffect(() => {
    if (orderNumber) {
      clearBasket(); // Clear the basket after order is confirmed
    }
  }, [orderNumber, clearBasket]);

  return (
    <DelayedPage>
    <div className="flex flex-col items-center justify-start min-h-screen bg-neutral-50 pt-28">
  <div className="bg-neutral-50 p-12 rounded-xs max-w-2xl w-full mx-4 uppercase min-h-fit">
    <h1 className="text-3xl font-bold pb-12 sm:pt-6 text-center">
      Thank You for Purchasing
    </h1>

    <div className="border-t border-b border-gray-200 py-9 mb-6 text-stone-950">
      <p className="text-base mb-4">
        Your order has been confirmed. We’re preparing your item(s) for shipment.
      </p>
      <div className="space-y-2">
        {orderNumber && (
          <p className="flex items-center space-x-5">
            <span>Order Number:</span>
            <span className="font-mono text-sm text-black">
              {orderNumber}
            </span>
          </p>
        )}
      </div>
    </div>

    <div className="space-y-7">
      <p className="text-center">
        You will receive a confirmation email shortly.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          className="bg-black hover:bg-white rounded-xs
          hover:text-black transition-colors duration-400 border border-black"
          asChild
        >
          <Link href="/orders">View Order Details</Link>
        </Button>
        <Button
          className="bg-black hover:bg-white text-white rounded-xs
          hover:text-black transition-colors duration-400 border border-black"
          asChild
          variant="outline"
        >
          <Link href="/">Continue</Link>
        </Button>
      </div>
    </div>
  </div>
</div>

    </DelayedPage>
  );
}

export default SuccessPage;