export interface Slug {
  _type: "slug";
  current: string;
}

export interface SanityImageHotspot {
  x: number;
  y: number;
  height: number;
  width: number;
}

export interface SanityImageCrop {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface SanityImage {
  _type: "image";
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [key: string]: any; // to allow internalGroqTypeReferenceTo or others
  };
  media?: unknown;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt?: string;
  _key?: string;
}

export interface PortableTextSpan {
  _type: "span";
  _key: string;
  text?: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: "block";
  _key: string;
  children?: PortableTextSpan[];
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet";
  level?: number;
  markDefs?: {
    _type: "link";
    _key: string;
    href?: string;
  }[];
}

export type DescriptionBlock = PortableTextBlock | SanityImage;

export interface ProductType {
  _id: string;
  _type: "productType"; // if your schema type is actually "product", change this
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  images?: SanityImage[];
  description?: DescriptionBlock[];
  price?: number;
  categories?: {
    _id: string;
    name: string;
  }[];
  stock?: number;
}