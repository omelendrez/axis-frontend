import { useSelector, useDispatch } from 'react-redux'
import {
  addCourseAssessment,
  modifyCourseAssessment,
  loadCourseAssessments,
  removeCourseAssessment
} from '../reducers/course-assessment/courseAssessmentSlice'

const useCourseAssessments = () => {
  const dispatch = useDispatch()
  const courseAssessments = useSelector((state) => state.courseAssessments)

  const add = (payload) => dispatch(addCourseAssessment(payload))
  const modify = (id, payload) => dispatch(modifyCourseAssessment(id, payload))
  const load = (search) => dispatch(loadCourseAssessments(search))
  const remove = (id) => dispatch(removeCourseAssessment(id))

  return {
    add,
    modify,
    courseAssessments,
    load,
    remove
  }
}

export default useCourseAssessments
