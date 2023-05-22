import { setMessage } from './notification/notificationSlice'
import { getApiErrorMessage, log } from '../helpers'

export function handleError(error, dispatch, reset) {
  if (error.code === 'ERR_CANCELED') {
    return
  }
  console.log(error)
  const message = {
    type: 'error',
    message: getApiErrorMessage(error)
  }
  log.error(error)
  dispatch(setMessage(message))
  setTimeout(() => {
    dispatch(reset())
  }, 1000)
}
