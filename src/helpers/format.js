export const formatShortDate = (date) =>
  new Intl.DateTimeFormat('en-GB').format(new Date(date))

export const documentNumber = (num) =>
  (parseInt(num, 10) + 1000000000000).toString().substring(1)

export const signatureNumber = (num) => parseInt(num, 10).toString(16)

export const getFilename = (id) => `${documentNumber(id)}.pdf`

export const getFOETFilename = (id) => `${documentNumber(id)}.jpg`

export const getSignatureFilename = ({ id, date }) =>
  `${signatureNumber(`${id}${date}`)}.png`

export const getImageFilename = (badge) => `${badge}.jpg`
