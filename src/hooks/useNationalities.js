import { useSelector, useDispatch } from 'react-redux'
import {
  addNationality,
  modifyNationality,
  loadNationalities,
  removeNationality
} from '../reducers/nationality/nationalitySlice'

const useNationalities = () => {
  const dispatch = useDispatch()
  const nationalities = useSelector((state) => state.nationalities)

  const add = (payload) => dispatch(addNationality(payload))
  const modify = (id, payload) => dispatch(modifyNationality(id, payload))
  const load = (search) => dispatch(loadNationalities(search))
  const remove = (id) => dispatch(removeNationality(id))

  return {
    add,
    modify,
    nationalities,
    load,
    remove
  }
}

export default useNationalities
