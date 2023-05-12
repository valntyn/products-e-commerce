import { IProduct } from '@utils/product';

export function getCategories(data: IProduct[]) {
  const categories = [
    ...new Set(data.map((product) => product.category.toLowerCase())),
  ];

  categories.sort((a, b) => a.localeCompare(b));

  const otherIndex = categories.indexOf('other');

  if (otherIndex !== -1) {
    categories.splice(otherIndex, 1);
    categories.push('other');
  }

  return [...categories];
}
