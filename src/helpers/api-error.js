// const ERROR_CODES = {
//   ERR_CONNECTION_REFUSED: 'ERR_CONNECTION_REFUSED',
//   ERR_BAD_REQUEST: 'ERR_BAD_REQUEST'
// }

export const getApiErrorMessage = (error) => {
  return error.response?.data?.message || error.message
  // log.error(
  //   e?.code
  //     ? e
  //     : { message: 'No error object from the server. Probably a network issue' }
  // )
  // if (e?.code === ERROR_CODES.ERR_CONNECTION_REFUSED) {
  //   return 'There was an network error. Please try again later.'
  // }

  // if (e?.code === ERROR_CODES.ERR_BAD_REQUEST) {
  //   return 'An error has occurred. Please double-check and try again.'
  // }
  // return 'There was an unknown server error. Please try again later.'
}
