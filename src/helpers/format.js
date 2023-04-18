export const formatShortDate = (date) =>
  new Intl.DateTimeFormat("en-GB").format(new Date(date));
