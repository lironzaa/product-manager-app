export interface Product {
  id: number,
  name: string,
  description?: string,
  price: number,
  creationDate: number,
  thumbnailUrl: string,
  url: string,
  type?: number
}