import { useSelector, useDispatch } from 'react-redux'

import { setMessage, reset } from '../reducers/notification/notificationSlice'

const useNotification = () => {
  const dispatch = useDispatch()

  const set = (payload) => dispatch(setMessage(payload))

  const clear = () => dispatch(reset())

  const { data } = useSelector((state) => state.notification)

  return { set, data, clear }
}

export default useNotification
