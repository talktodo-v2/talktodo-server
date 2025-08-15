export const toDayRange = (date?: Date) => {
  if (!date) return {};

  const kst = new Date(date);
  const startOfDay = new Date(kst.setHours(0, 0, 0, 0));
  const endOfDay = new Date(kst.setHours(23, 59, 59, 999));
  return { startOfDay, endOfDay };
};
