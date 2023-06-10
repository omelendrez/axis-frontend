import { useSelector, useDispatch } from 'react-redux'
import {
  addClassroom,
  modifyClassroom,
  loadClassrooms,
  removeClassroom
} from '../reducers/class/classSlice'

const useClasses = () => {
  const dispatch = useDispatch()
  const classes = useSelector((state) => state.classes)

  const add = (payload) => dispatch(addClassroom(payload))
  const modify = (id, payload) => dispatch(modifyClassroom(id, payload))
  const load = (search) => dispatch(loadClassrooms(search))
  const remove = (id) => dispatch(removeClassroom(id))

  return {
    add,
    modify,
    classes,
    load,
    remove
  }
}

export default useClasses
