import { defineField, defineType } from "sanity";
import { TrolleyIcon } from "@sanity/icons";

export const productType = defineType({
  name: "productType",
  title: "Product type",
  type: "document",
  icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "blockContent",
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    // ✅ New: connect product to subcategories (like Ferrari or 1:12)
    defineField({
      name: "subcategories",
      title: "Subcategories",
      type: "array",
      of: [{ type: "reference", to: { type: "subcategory" } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "scale",
      title: "Scale",
      type: "string",
      description: "e.g. 1:8, 1:12, 1:18",
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images.0",
      price: "price",
    },
    prepare(select) {
      return {
        title: select.title,
        subtitle: `€${select.price}`,
        media: select.media,
      };
    },
  },
});
