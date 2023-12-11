export const PAGE_SIZE = 20

export const paginationInitialValues = {
  search: '',
  page: 1,
  limit: PAGE_SIZE,
  offset: 0
}

export const setURLParams = (params) => {
  if (!params) {
    return ''
  }
  const urls = []
  Object.entries(params).forEach(([field, value]) => {
    if (value) {
      urls.push(`${field}=${value}`)
    }
  })
  return `?${urls.join('&')}`
}
