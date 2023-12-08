export const PAGE_SIZE = 20

export const paginationInitialValues = {
  search: '',
  page: 1,
  limit: PAGE_SIZE,
  offset: 0
}

export const setURLParams = (pagination) => {
  if (!pagination) {
    return ''
  }
  const urls = []
  Object.entries(pagination).forEach(([field, value]) => {
    if (value) {
      urls.push(`${field}=${value}`)
    }
  })
  return `?${urls.join('&')}`
}
