import { useSelector, useDispatch } from 'react-redux'
import {
  addClass,
  modifyClass,
  loadClasses,
  removeClass
} from '../reducers/class/classSlice'

const useClasses = () => {
  const dispatch = useDispatch()
  const classes = useSelector((state) => state.classes)

  const add = (payload) => dispatch(addClass(payload))
  const modify = (id, payload) => dispatch(modifyClass(id, payload))
  const load = (search) => dispatch(loadClasses(search))
  const remove = (id) => dispatch(removeClass(id))

  return {
    add,
    modify,
    classes,
    load,
    remove
  }
}

export default useClasses
