export const formatShortDate = (date) =>
  new Intl.DateTimeFormat(['ban', 'id']).format(new Date(date))
