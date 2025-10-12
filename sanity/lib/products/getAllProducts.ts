import { defineQuery } from "next-sanity";
import { sanityFetch } from "../fetch";
import type { ProductType } from "@/sanity.types";

export const getAllProducts = async (): Promise<ProductType[]> => {
  const ALL_PRODUCTS_QUERY = defineQuery(`
    *[_type == "productType"] | order(name asc)
  `);

  try {
    const products = await sanityFetch<ProductType[]>(ALL_PRODUCTS_QUERY);
    return products || [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
};