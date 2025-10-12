import { defineQuery } from "next-sanity";
import { sanityFetch } from "../fetch";
import type { ProductType } from "@/sanity.types";

export const getProductBySlug = async (slug: string): Promise<ProductType | null> => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(`
    *[_type == "productType" && slug.current == $slug][0]{
    ...,
    categories[]->{
      _id,
      name,
    }
  }`);

  try {
    const product = await sanityFetch<ProductType | null>(PRODUCT_BY_SLUG_QUERY, {
      slug,
    });

    return product ?? null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};