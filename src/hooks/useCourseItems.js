import { useSelector, useDispatch } from 'react-redux'
import {
  addCourseItem,
  modifyCourseItem,
  loadCourseItems,
  removeCourseItem
} from '../reducers/course-item/courseItemSlice'

const useCourseItems = () => {
  const dispatch = useDispatch()
  const courseItems = useSelector((state) => state.courseItems)

  const add = (payload) => dispatch(addCourseItem(payload))
  const modify = (id, payload) => dispatch(modifyCourseItem(id, payload))
  const load = (search) => dispatch(loadCourseItems(search))
  const remove = (id) => dispatch(removeCourseItem(id))

  return {
    add,
    modify,
    courseItems,
    load,
    remove
  }
}

export default useCourseItems
