import { Subcategory } from "@/sanity.types";
import { sanityFetch } from "./fetch";

export async function fetchSubcategoryBySlug(slug: string) {
  const query = `*[_type == "subcategory" && slug.current == $slug][0]{
    title,
    image,
    video
  }`;
  const subcategory = await sanityFetch<Subcategory>(query, { slug });
  return subcategory;
}