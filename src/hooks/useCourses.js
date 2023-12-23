import { useSelector, useDispatch } from 'react-redux'
import {
  addCourse,
  modifyCourse,
  loadCourses,
  removeCourse
} from '../reducers/course/courseSlice'

let coursesParams = null

const useCourses = () => {
  const dispatch = useDispatch()
  const courses = useSelector((state) => state.courses)

  const add = (payload) => dispatch(addCourse(payload))
  const modify = (id, payload) => dispatch(modifyCourse(id, payload))
  const load = (params) => {
    if (coursesParams !== JSON.stringify(params)) {
      dispatch(loadCourses(params))
      coursesParams = JSON.stringify(params)
    }
  }
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
