import { useSelector, useDispatch } from 'react-redux'
import {
  addNationality,
  modifyNationality,
  loadNationalities,
  removeNationality
} from '../reducers/nationality/nationalitySlice'

let nationalitiesParams = null
const useNationalities = () => {
  const dispatch = useDispatch()
  const nationalities = useSelector((state) => state.nationalities)

  const add = (payload) => dispatch(addNationality(payload))
  const modify = (id, payload) => dispatch(modifyNationality(id, payload))
  const load = (params) => {
    if (nationalitiesParams !== JSON.stringify(params)) {
      dispatch(loadNationalities(params))
      nationalitiesParams = JSON.stringify(params)
    }
  }
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
