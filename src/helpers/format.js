export const formatShortDate = (date) =>
  new Intl.DateTimeFormat('en-GB').format(new Date(date))

export const documentNumber = (num) =>
  (parseInt(num, 10) + 1000000000000).toString().substring(1)

export const getFilename = (id) => `${documentNumber(id)}.pdf`

export const getImageFilename = (badge) => `${badge}.jpg`
