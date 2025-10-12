export interface Product {
  _id: string
  name: string
  slug: {
    current: string
  }
  price: number
  images: {
    asset: {
      url: string
    }
  }[]
}