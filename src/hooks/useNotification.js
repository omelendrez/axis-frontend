import { useSelector, useDispatch } from 'react-redux'

import { setMessage } from '../reducers/notification/notificationSlice'

const useNoficication = () => {

  const dispatch = useDispatch()

  const set = (payload) => dispatch(setMessage(payload))

  const { data } = useSelector((state) => state.notification)

  return { set, data }
}

export default useNoficication
