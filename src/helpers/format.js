import compareDesc from 'date-fns/compareDesc'
import formatDistance from 'date-fns/formatDistance'
import format from 'date-fns/format'
import addDays from 'date-fns/addDays'

export const formatShortDate = (date) =>
  new Intl.DateTimeFormat('en-GB').format(new Date(date))

export const isNewer = (date, days = 0) =>
  compareDesc(addDays(new Date(), days), date) > 0

export const isEqual = (date) =>
  formatShortDate(date) === formatShortDate(new Date())

export const formatYMD = (date) =>
  date
    ? new Intl.DateTimeFormat('en-GB')
        .format(new Date(date))
        .split('/')
        .reverse()
        .join('-')
    : null

export const formatFullDate = (date) => {
  return date
    ? formatYMD(date) === formatYMD(new Date())
      ? format(date, 'PPPP')
      : `${format(date, 'PPPP')} (${formatDistance(
          new Date(formatYMD(date)),
          new Date(formatYMD(new Date())),
          {
            addSuffix: true
          }
        )})`
    : null
}

export const convertDateFormat = (date) =>
  new Date(date.split('/').reverse().join('-'))

export const invertDateFormat = (date) => date.split('-').reverse().join('/')

export const getTrainingDates = (start, end) => {
  const nStart = convertDateFormat(start)
  const nEnd = convertDateFormat(end)
  let dates = []
  let nDate = nStart
  while (nDate <= nEnd) {
    nDate = addDays(nDate, 1)
    dates = [...dates, { date: formatYMD(nDate) }]
  }

  return dates
}

export const documentNumber = (num) =>
  (parseInt(num, 10) + 10 ** 12).toString().substring(1)

export const getFilename = (id) => `${documentNumber(id)}.pdf`

export const getFOETFilename = (id) => `${documentNumber(id)}.jpg`

export const getPaymentFilename = (id) => `${documentNumber(id)}.jpg`

export const getImageFilename = (badge) => `${badge}.jpg`
