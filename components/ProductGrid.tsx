"use client";
import { useEffect } from "react";
import { ProductType } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";
import { useRouter } from "next/navigation";

function ProductGrid({ products }: { products: ProductType[] }) {
  const router = useRouter();
  useEffect(() => {
    products.slice(0, 12).forEach((product) => {
      if (product.slug?.current) {
        router.prefetch(`/pr/${product.slug.current}`);
      }
    });
  }, [products, router]);

  return (
    <div
      className="bg-neutral-50 grid grid-cols-2 gap-2 py-2 
      lg:grid-cols-3 gap
      lg:gap-4 xl:gap-5
      lg:py-4 w-full min-h-fit"
    >
      {products?.map((product) => {
        return (
          <AnimatePresence key={product._id}>
            <motion.div
              layout
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center min-h-fit"
            >
              <ProductThumb key={product._id} product={product} />
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}

export default ProductGrid;