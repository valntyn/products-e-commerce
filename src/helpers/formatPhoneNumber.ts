export const formattedPhoneNumber = (phoneNumber: string) => {
  return phoneNumber
    .slice(0, 13)
    .replace(/(\d{3})(\d{2})?(\d{0,3})?(\d{0,2})?/,
      (_, p1, p2, p3, p4) => [p1, p2, p3, p4]
        .filter(Boolean).join('-'));
};
