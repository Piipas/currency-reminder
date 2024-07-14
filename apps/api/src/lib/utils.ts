export const minusDays = (days: number) => {
  const today = new Date();

  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - 30);

  const formattedDate = pastDate.toLocaleDateString("en-CA");
  return formattedDate;
};

export const formatToday = () => {
  const today = new Date();

  const formattedDate = today.toLocaleDateString("en-CA");
  return formattedDate;
};
