import { useSelector, useDispatch } from 'react-redux'
import {
  addCertificateType,
  modifyCertificateType,
  loadCertificateTypes,
  removeCertificateType
} from '../reducers/certificate-type/certificateTypeSlice'

const useCertificateTypes = () => {
  const dispatch = useDispatch()
  const certificateTypes = useSelector((state) => state.certificateTypes)

  const add = (payload) => dispatch(addCertificateType(payload))
  const modify = (id, payload) => dispatch(modifyCertificateType(id, payload))
  const load = (search) => dispatch(loadCertificateTypes(search))
  const remove = (id) => dispatch(removeCertificateType(id))

  return {
    add,
    modify,
    certificateTypes,
    load,
    remove
  }
}

export default useCertificateTypes
