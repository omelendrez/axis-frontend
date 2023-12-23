import { useSelector, useDispatch } from 'react-redux'
import {
  addUser,
  modifyUser,
  loadUsers,
  removeUser
} from '../reducers/user/userSlice'

let usersParams = null

const useUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const add = (payload) => dispatch(addUser(payload))
  const modify = (id, payload) => dispatch(modifyUser(id, payload))
  const load = (params) => {
    if (usersParams !== JSON.stringify(params)) {
      dispatch(loadUsers(params))
      usersParams = JSON.stringify(params)
    }
  }
  const remove = (id) => dispatch(removeUser(id))

  return {
    add,
    modify,
    users,
    load,
    remove
  }
}

export default useUsers
