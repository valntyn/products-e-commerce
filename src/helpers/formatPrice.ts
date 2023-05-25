export const formatNumber = (value: number): string => {
  const formattedValue = Math.round(value * 100) / 100;

  return `${formattedValue} USD`;
};
