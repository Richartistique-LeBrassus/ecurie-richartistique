"use client";
import { Metadata, createCheckoutSession } from "@/actions/createCheckoutSession";
import useBasketStore from "@/store/store";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SplashScreen from "@/components/ui/SplashScreen";
import { imageUrl } from "@/lib/imageUrl";
import { motion, AnimatePresence } from "framer-motion";
import DelayedPage from "./ui/DelayedPage";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const addItem = useBasketStore((state) => state.addItem);
  const removeItem = useBasketStore((state) => state.removeItem);
  const removeItemCompletely = useBasketStore((state) => state.removeItemCompletely);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <SplashScreen />;
  }

  const handleCheckout = async () => {
    if (!isSignedIn) {
      alert("Please sign in first.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        const orderNumber = crypto.randomUUID();
        router.push(`/success?orderNumber=${orderNumber}`);
      } else {
        alert("Payment failed. Please try again.");
        return;
      }

      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "Unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
        clerkUserId: user!.id,
      };

      const checkoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (checkoutUrl != null) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      console.error("Checkout failed", error);
      alert("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DelayedPage>
    <AnimatePresence mode="wait">
      {groupedItems.length === 0 ? (
        <motion.div
          key="empty-cart"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="mx-auto flex flex-col items-center justify-center
            min-h-[110vh] w-full bg-neutral-50 uppercase pb-32"
        >
          <h1 className="text-2xl font-bold mb-6">Your cart is empty</h1>
          <p className="text-lg">No items in cart</p>
        </motion.div>
      ) : (
        <motion.div
          key="cart-screen"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className=" bg-neutral-50 text-stone-950
            pb-37 pt-32 w-full min-h-screen"
        >
          <div
            className="inline-flex justify-center items-center w-full font-bold 
            uppercase pb-6 border-b border-neutral-300"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={groupedItems.reduce((total, item) => total + item.quantity, 0)}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <h1 className="text-base tracking-wider">
                  Shopping Bag ({groupedItems.reduce((total, item) => total + item.quantity, 0)})
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>
          <div
            className="w-full xl:max-w-[60vw] grid grid-cols-1 px-4 mx-auto
            lg:max-w-[75vw] lg:grid-cols-2 gap-5"
          >
            {groupedItems?.map((item) => (
              <div key={item.product._id} className="py-7 w-full min-w-fit lg:justify-self-start">
                <div
                  className="flex flex-col items-center w-full cursor-pointer gap-5"
                  onClick={() => router.push(`/pr/${item.product.slug?.current}`)}
                >
                  <div
                    className="relative w-full h-[20vh]
                    sm:h-[37vh] md:h-[45vh] lg:h-[27vh]"
                  >
                    {item.product.images && (
                      <Image
                        src={imageUrl(item.product.images[0]).url()}
                        alt={item.product.name ?? "Product Image"}
                        className="absolute w-full h-full object-cover rounded-xs"
                        fill
                      />
                    )}
                  </div>

                  <div className="flex flex-col items-start w-full px-2 space-y-3">
                    <h2 className="text-sm tracking-wide font-extrabold uppercase">
                      {item.product.name}
                    </h2>
                    <p className="text-sm">€ {item.product.price}</p>
                    <div className="inline-flex w-full justify-between items-center">
                      <div className="flex flex-col text-xs underline uppercase space-y-3 underline-offset-5 decoration-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItemCompletely(item.product._id);
                          }}
                          className="text-xs underline uppercase space-y-3 underline-offset-5 decoration-2
                          hover:cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeItem(item.product._id);
                          }}
                          className="w-7 h-7 bg-neutral-50 
                          flex items-center hover:cursor-pointer
                          justify-center text-sm font-bold text-slate-950"
                        >
                          −
                        </button>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={item.quantity}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <span className="text-sm font-semibold hover:cursor-default">
                              {item.quantity}
                            </span>
                          </motion.div>
                        </AnimatePresence>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addItem(item.product);
                          }}
                          className="w-7 h-7 bg-neutral-50  flex items-center hover:cursor-pointer
                          justify-center text-sm font-bold text-slate-950"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div
              className="w-full flex flex-col gap-7 my-7 lg:justify-self-end
              h-fit py-7 lg:sticky lg:top-4 lg:left-auto lg:w-[25vw] uppercase
              tracking-wide border-y border-neutral-300"
            >
              <h3 className="text-xl font-semibold px-2">Order Summary</h3>
              <div className="mt-4 space-y-2 font-bold px-2">
                <div className="flex justify-between text-sm">
                  <span>Items:</span>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={groupedItems.reduce((total, item) => total + item.quantity, 0)}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <span>
                        {groupedItems.reduce((total, item) => total + item.quantity, 0)}
                      </span>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="flex justify-between pt-2 text-sm">
                  <span>Total (Estimated)</span>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={useBasketStore.getState().getTotalPrice()}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="tracking-wider"
                    >
                      €{useBasketStore.getState().getTotalPrice().toFixed(2)}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {isSignedIn ? (
                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="mt-4 w-full bg-neutral-50 text-stone-950 hover:bg-stone-950
                  hover:text-white duration-400 hover:cursor-pointer
                  border border-stone-950 py-3
                  disabled:bg-red-900 disabled:border-red-900 disabled:text-white
                  uppercase text-xs tracking-wider font-semibold rounded-xs"
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button
                    className="mt-4 w-full bg-neutral-50 text-stone-950 rounded-xs
                    hover:bg-stone-950 uppercase text-xs tracking-wider font-semibold
                    duration-400 hover:text-white hover:cursor-pointer
                    border border-stone-950 py-3"
                  >
                    Sign in to Checkout
                  </button>
                </SignInButton>
              )}

              <div className="flex gap-4 mt-4 px-2">
                <Image src="/clerk.svg" alt="Clerk" width={24} height={24} className="h-6" />
                <Image src="/visa.svg" alt="Visa" width={24} height={24} className="h-6" />
                <Image src="/mastercard.svg" alt="Mastercard" width={24} height={24} className="h-6" />
                <Image src="/klarna.svg" alt="Klarna" width={24} height={24} className="h-6" />
                <Image src="/americanexpress.svg" alt="American Express" width={24} height={24} className="h-6" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </DelayedPage>
  );
}

export default BasketPage;