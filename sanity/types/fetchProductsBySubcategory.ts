import { sanityFetch } from "../lib/fetch";
import { ProductType } from "@/sanity.types";

export async function fetchProductsBySubcategory(slug: string): Promise<ProductType[]> {
  const query = `*[_type == "productType" && "${slug}" in subcategories[]->slug.current]{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    _rev,
    name,
    slug,
    images,
    description,
    price,
    categories,
    stock,
    subcategories[]-> // if you use this in the UI
  }`;

  return sanityFetch<ProductType[]>(query);
}