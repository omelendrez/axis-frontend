import { useSelector, useDispatch } from 'react-redux'
import {
  addContactType,
  modifyContactType,
  loadContactTypes,
  removeContactType
} from '../reducers/contact-type/contactTypeSlice'

const useContactTypes = () => {
  const dispatch = useDispatch()
  const contactTypes = useSelector((state) => state.contactTypes)

  const add = (payload) => dispatch(addContactType(payload))
  const modify = (id, payload) => dispatch(modifyContactType(id, payload))
  const load = (search) => dispatch(loadContactTypes(search))
  const remove = (id) => dispatch(removeContactType(id))

  return {
    add,
    modify,
    contactTypes,
    load,
    remove
  }
}

export default useContactTypes
