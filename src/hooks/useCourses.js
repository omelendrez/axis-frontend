import { useSelector, useDispatch } from 'react-redux'
import {
  addCourse,
  modifyCourse,
  loadCourses,
  removeCourse
} from '../reducers/course/courseSlice'

const useCourses = () => {
  const dispatch = useDispatch()
  const courses = useSelector((state) => state.courses)

  const add = (payload) => dispatch(addCourse(payload))
  const modify = (id, payload) => dispatch(modifyCourse(id, payload))
  const load = (search) => dispatch(loadCourses(search))
  const remove = (id) => dispatch(removeCourse(id))

  return {
    add,
    modify,
    courses,
    load,
    remove
  }
}

export default useCourses
