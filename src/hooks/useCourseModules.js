import { useSelector, useDispatch } from 'react-redux'
import {
  addCourseModule,
  modifyCourseModule,
  loadCourseModules,
  removeCourseModule
} from '../reducers/course-module/courseModuleSlice'

const useCourseModules = () => {
  const dispatch = useDispatch()
  const courseModules = useSelector((state) => state.courseModules)

  const add = (payload) => dispatch(addCourseModule(payload))
  const modify = (id, payload) => dispatch(modifyCourseModule(id, payload))
  const load = (search) => dispatch(loadCourseModules(search))
  const remove = (id) => dispatch(removeCourseModule(id))

  return {
    add,
    modify,
    courseModules,
    load,
    remove
  }
}

export default useCourseModules
