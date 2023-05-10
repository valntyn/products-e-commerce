export function calculatePrice(price: number, percent: number) {
  const newPrice = price * (1 - (percent / 100));

  return newPrice.toFixed(1);
}
