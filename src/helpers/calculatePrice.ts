export function calculatePrice(price: number, percent: number) {
  const newPrice = price * (1 - (percent / 100));

  return newPrice.toFixed(1);
}

export function calculatePercentage(percent: number, number: number) {
  const result = (percent / 100) * number;

  return result;
}

export function calculateSum(obj: { [key: string]: number }): number {
  return Object.values(obj).reduce((sum, value) => sum + value, 0);
}
