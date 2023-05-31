export const formatDate = (daysToAdd: number): string => {
  const date = new Date();

  date.setDate(date.getDate() + daysToAdd);

  const month = date.toLocaleString('en-US', { month: 'long' });
  const day = date.toLocaleString('en-US', { day: 'numeric' });
  const year = date.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return formattedDate;
};
