import { useSelector, useDispatch } from 'react-redux'
import {
  addTraining,
  modifyTraining,
  loadTrainings,
  removeTraining,
  loadTrainingView,
  resetTrainingView
} from '../reducers/training/trainingSlice'

const useTrainings = () => {
  const dispatch = useDispatch()
  const trainings = useSelector((state) => state.trainings)
  const learnerTrainings = useSelector((state) => state.learnerTrainings)

  const add = (payload) => dispatch(addTraining(payload))
  const modify = (id, payload) => dispatch(modifyTraining(id, payload))
  const load = (params) => dispatch(loadTrainings(params))
  const loadView = (id) => dispatch(loadTrainingView(id))
  const remove = (id) => dispatch(removeTraining(id))
  const resetView = () => dispatch(resetTrainingView())

  return {
    add,
    modify,
    trainings,
    learnerTrainings,
    load,
    loadView,
    remove,
    resetView
  }
}

export default useTrainings
