import { useSelector, useDispatch } from 'react-redux'
import {
  addLearner,
  modifyLearner,
  loadLearners,
  removeLearner
} from '../reducers/learner/learnerSlice'

const useLearners = () => {
  const dispatch = useDispatch()
  const learners = useSelector((state) => state.learners)

  const add = (payload) => dispatch(addLearner(payload))
  const modify = (id, payload) => dispatch(modifyLearner(id, payload))
  const load = (params) => dispatch(loadLearners(params))
  const remove = (id) => dispatch(removeLearner(id))

  return {
    add,
    modify,
    learners,
    load,
    remove
  }
}

export default useLearners
