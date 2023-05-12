import { IProduct } from '@utils/product';

export function getBrands(data: IProduct[]) {
  return [...new Set(data.reduce((acc: string[], product) => {
    acc.push(product.brand);

    return acc;
  }, []))];
}
