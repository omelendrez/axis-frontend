import { useSelector, useDispatch } from 'react-redux'
import {
  addCourseAssesment,
  modifyCourseAssesment,
  loadCourseAssesments,
  removeCourseAssesment
} from '../reducers/course-assesment/courseAssesmentSlice'

const useCourseAssesments = () => {
  const dispatch = useDispatch()
  const courseAssesments = useSelector((state) => state.courseAssesments)

  const add = (payload) => dispatch(addCourseAssesment(payload))
  const modify = (id, payload) => dispatch(modifyCourseAssesment(id, payload))
  const load = (search) => dispatch(loadCourseAssesments(search))
  const remove = (id) => dispatch(removeCourseAssesment(id))

  return {
    add,
    modify,
    courseAssesments,
    load,
    remove
  }
}

export default useCourseAssesments
