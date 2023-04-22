import { useSelector, useDispatch } from 'react-redux'
import {
  addRole,
  modifyRole,
  loadRoles,
  removeRole
} from '../reducers/role/roleSlice'

const useRoles = () => {
  const dispatch = useDispatch()
  const roles = useSelector((state) => state.roles)

  const add = (payload) => dispatch(addRole(payload))
  const modify = (id, payload) => dispatch(modifyRole(id, payload))
  const load = (search) => dispatch(loadRoles(search))
  const remove = (id) => dispatch(removeRole(id))

  return {
    add,
    modify,
    roles,
    load,
    remove
  }
}

export default useRoles
