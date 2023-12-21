import { useSelector, useDispatch } from 'react-redux'
import {
  addCompany,
  modifyCompany,
  loadCompanies,
  removeCompany
} from '../reducers/company/companySlice'

let companiesParams = null

const useCompanies = () => {
  const dispatch = useDispatch()
  const companies = useSelector((state) => state.companies)

  const add = (payload) => dispatch(addCompany(payload))
  const modify = (id, payload) => dispatch(modifyCompany(id, payload))
  const load = (params) => {
    if (companiesParams !== JSON.stringify(params)) {
      dispatch(loadCompanies(params))
      companiesParams = JSON.stringify(params)
    }
  }
  const remove = (id) => dispatch(removeCompany(id))

  return {
    add,
    modify,
    companies,
    load,
    remove
  }
}

export default useCompanies
