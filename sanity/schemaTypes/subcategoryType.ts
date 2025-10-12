import { TagIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const subcategoryType = defineType({
  name: 'subcategory',
  title: 'Subcategory',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image', // So the image shows in Studio previews
    },
  },
});