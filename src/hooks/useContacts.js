import { useSelector, useDispatch } from 'react-redux'
import {
  addContact,
  modifyContact,
  loadContacts,
  removeContact
} from '../reducers/contact/contactSlice'

const useContacts = () => {
  const dispatch = useDispatch()
  const contacts = useSelector((state) => state.contacts)

  const add = (payload) => dispatch(addContact(payload))
  const modify = (id, payload) => dispatch(modifyContact(id, payload))
  const load = (search) => dispatch(loadContacts(search))
  const remove = (id) => dispatch(removeContact(id))

  return {
    add,
    modify,
    contacts,
    load,
    remove
  }
}

export default useContacts
