import { setMessage } from './notification/notificationSlice'
import { getApiErrorMessage, log } from '../helpers'

export function handleError(error, dispatch, reset) {
  if (error.code === 'ERR_CANCELED') {
    return
  }
  const message = {
    type: 'error',
    message: getApiErrorMessage(error)
  }
  log.error(error)
  console.log(error)
  dispatch(setMessage(message))
  setTimeout(() => {
    dispatch(reset())
  }, 200)
}
