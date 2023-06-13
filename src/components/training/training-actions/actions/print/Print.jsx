import { Task } from '../../Task'
import {
  generateCertificate,
  generateIdCard,
  getCertificateUrl,
  getIdCardUrl,
  certificateExists,
  idCardExists
} from '../../../../../services'
import useApiMessages from '../../../../../hooks/useApiMessages'
import useUser from '../../../../../hooks/useUser'
import { DOC_TYPE } from '../../../../../helpers'
import './print.css'
import { useEffect, useState } from 'react'

export const Print = ({ training, type }) => {
  const { apiMessage } = useApiMessages()
  const { user } = useUser()

  const trainingId = training?.id

  const [refresh, setRefresh] = useState(false)

  const [isDoc, setIsDoc] = useState(false)

  const documentUrl =
    type === DOC_TYPE.CERTIFICATE
      ? getCertificateUrl(trainingId)
      : getIdCardUrl(trainingId)

  const generate =
    type === DOC_TYPE.CERTIFICATE ? generateCertificate : generateIdCard

  const docExists =
    type === DOC_TYPE.CERTIFICATE ? certificateExists : idCardExists

  const previewWidth = type === DOC_TYPE.CERTIFICATE ? 300 : 300
  const previewHeight = type === DOC_TYPE.CERTIFICATE ? 480 : 450

  useEffect(() => {
    docExists(trainingId)
      .then((res) => setIsDoc(res.data.exists))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  const handleGenerate = (e) => {
    e.preventDefault()
    const payload = {
      ...training,
      user
    }

    generate(trainingId, payload)
      .then((res) => {
        const data = {
          message: `${res.data.Title} for ${res.data.Subject}, generated Successfully!`
        }
        apiMessage({ data })
        setRefresh((r) => !r)
      })
      .catch((e) => apiMessage(e))
  }

  const props = {
    type: 'application/pdf',
    height: previewHeight,
    width: previewWidth
  }

  return (
    <Task
      title={type === DOC_TYPE.CERTIFICATE ? 'Certificate' : 'ID Card'}
      className="document"
      approveLabel={isDoc ? 'Re-generate' : 'Generate'}
      approveDisabled={!user.roles.find((r) => r.id === 1) && isDoc}
      rejectLabel="Print"
      onApprove={user.roles.find((r) => r.id === 1) ? handleGenerate : null}
    >
      {isDoc && (
        <figure>
          <object data={documentUrl} {...props}>
            <embed src={documentUrl} {...props} />
          </object>
        </figure>
      )}
    </Task>
  )
}
