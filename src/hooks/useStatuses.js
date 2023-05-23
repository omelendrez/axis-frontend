import { useSelector, useDispatch } from 'react-redux'
import {
  addStatus,
  modifyStatus,
  loadStatuses,
  removeStatus
} from '../reducers/status/statusSlice'

const useStatuses = () => {
  const dispatch = useDispatch()
  const statuses = useSelector((state) => state.statuses)

  const add = (payload) => dispatch(addStatus(payload))
  const modify = (id, payload) => dispatch(modifyStatus(id, payload))
  const load = (search) => dispatch(loadStatuses(search))
  const remove = (id) => dispatch(removeStatus(id))

  return {
    add,
    modify,
    statuses,
    load,
    remove
  }
}

export default useStatuses
