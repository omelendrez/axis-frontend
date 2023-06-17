import { useSelector, useDispatch } from 'react-redux'
import {
  addTraining,
  modifyTraining,
  loadTrainings,
  removeTraining,
  loadTrainingView
} from '../reducers/training/trainingSlice'

const useTrainings = () => {
  const dispatch = useDispatch()
  const trainings = useSelector((state) => state.trainings)

  const add = (payload) => dispatch(addTraining(payload))
  const modify = (id, payload) => dispatch(modifyTraining(id, payload))
  const load = (search) => dispatch(loadTrainings(search))
  const loadView = (id) => dispatch(loadTrainingView(id))
  const remove = (id) => dispatch(removeTraining(id))

  return {
    add,
    modify,
    trainings,
    load,
    loadView,
    remove
  }
}

export default useTrainings
