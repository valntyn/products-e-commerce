import { Price } from './price';
import { Stock } from './stock';

export interface ProductForCart {
  id: string;
  productId: string;
  selectedStock: number,
  selectedPackage: string,
  title: string
  price: Price
  discount: number
  rating: number
  brand: string
  stock: Stock
  time: number
  img: string[]
}
