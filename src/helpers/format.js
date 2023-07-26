import compareDesc from 'date-fns/compareDesc'
import formatDistance from 'date-fns/formatDistance'
import format from 'date-fns/format'

export const formatShortDate = (date) =>
  new Intl.DateTimeFormat('en-GB').format(new Date(date))

export const isNewer = (date) => compareDesc(new Date(), date) > 0

export const isEqual = (date) =>
  formatShortDate(date) === formatShortDate(new Date())

export const formatYMD = (date) =>
  new Intl.DateTimeFormat('en-GB')
    .format(new Date(date))
    .split('/')
    .reverse()
    .join('-')

export const formatFullDate = (date) => {
  return formatYMD(date) === formatYMD(new Date())
    ? format(date, 'PPPP')
    : `${format(date, 'PPPP')} (${formatDistance(
        new Date(formatYMD(date)),
        new Date(formatYMD(new Date())),
        {
          addSuffix: true
        }
      )})`
}

export const documentNumber = (num) =>
  (parseInt(num, 10) + (10 ^ 12)).toString().substring(1)

export const signatureNumber = (num) => parseInt(num, 10).toString(16)

export const getFilename = (id) => `${documentNumber(id)}.pdf`

export const getFOETFilename = (id) => `${documentNumber(id)}.jpg`

export const getSignatureFilename = ({ id, date }) =>
  `${signatureNumber(`${id}${date}`)}.png`

export const getImageFilename = (badge) => `${badge}.jpg`
