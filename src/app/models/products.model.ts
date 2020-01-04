export interface Product {
  id: number,
  name: string,
  description?: string,
  price: number,
  creationDate: number,
  thumbnailImage: string,
  urlImage: string,
  type: number
}