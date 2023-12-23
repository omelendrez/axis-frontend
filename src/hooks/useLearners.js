import { useSelector, useDispatch } from 'react-redux'
import {
  addLearner,
  modifyLearner,
  loadLearners,
  removeLearner
} from '../reducers/learner/learnerSlice'

let learnersParams = null

const useLearners = () => {
  const dispatch = useDispatch()
  const learners = useSelector((state) => state.learners)

  const add = (payload) => dispatch(addLearner(payload))
  const modify = (id, payload) => dispatch(modifyLearner(id, payload))
  const load = (params) => {
    if (learnersParams !== JSON.stringify(params)) {
      dispatch(loadLearners(params))
      learnersParams = JSON.stringify(params)
    }
  }

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
