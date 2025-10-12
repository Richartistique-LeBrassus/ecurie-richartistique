import { defineQuery } from "next-sanity";
import type { ProductType } from "@/sanity.types";
import { sanityFetch } from "../live";

export const searchProductsByName = async (
  searchParam: string
): Promise<ProductType[]> => {
  const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[
      _type == "productType" &&
      name match $searchParam
    ] | order(name asc)
  `);

  try {
    const products = await sanityFetch({
      query: PRODUCT_SEARCH_QUERY,
      params: { searchParam: `${searchParam}*` },
    });

    const normalized: ProductType[] = (products.data || []).map((p: any) => ({
      ...p,
      slug: p.slug?.current
        ? { _type: "slug", current: p.slug.current }
        : undefined,
      images: p.images || [],
      name: p.name || "",
      price: p.price || 0,
      stock: p.stock || 0,
      categories: p.categories || [],
      description: p.description || [],
    }));

    return normalized;
  } catch (error) {
    console.error("Error fetching products by name:", error);
    return [];
  }
};