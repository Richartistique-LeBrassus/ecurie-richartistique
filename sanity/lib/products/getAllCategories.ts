import { defineQuery } from "next-sanity";
import { sanityFetch } from "../fetch";
import type { Category } from "@/sanity.types";

export const getAllCategories = async (): Promise<Category[]> => {
  const ALL_CATEGORIES_QUERY = defineQuery(`
    *[_type == "category"] | order(name asc)
  `);

  try {
    const categories = await sanityFetch<Category[]>(ALL_CATEGORIES_QUERY);
    return categories || [];
  } catch (error) {
    console.log("Error fetching all categories:", error);
    return [];
  }
};