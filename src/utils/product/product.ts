import { Answers } from './answer';
import { Price } from './price';
import { Question } from './question';
import { Stock } from './stock';

export interface IProduct {
  title: string
  price: Price
  discount: number
  rating: number
  category: string
  brand: string
  stock: Stock
  fresheness: string
  delivery: string
  time: number
  freeShipping: boolean
  size: string
  color: string
  country: string
  description: string
  img: string[]
  reviews: string[]
  id: string
  origin: string
  recipe: string
  questions: Question[]
  answers: Answers[]
}
