import { Task } from '../Task'
import {
  generateCertificate,
  generateIdCard,
  getCertificateUrl,
  getFilename,
  getIdCardUrl,
  certificateExists
} from '../../../../services'
import useApiMessages from '../../../../hooks/useApiMessages'
import useUser from '../../../../hooks/useUser'
import { DOC_TYPE } from '../../../../helpers'
import './print.css'
import { useEffect, useState } from 'react'

export const Print = ({ training, type }) => {
  const { apiMessage } = useApiMessages()
  const { user } = useUser()

  const trainingId = training?.id

  const [refresh, setRefresh] = useState(false)

  const [isCertificate, setIsCertificate] = useState(false)

  useEffect(() => {
    certificateExists(trainingId)
      .then((res) => setIsCertificate(res.data.exists))
      .catch((e) => apiMessage(e))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh])

  const documentUrl =
    type === DOC_TYPE.CERTIFICATE
      ? getCertificateUrl(trainingId)
      : getIdCardUrl(trainingId)

  const handleGenerate = (e) => {
    e.preventDefault()
    const payload = {
      ...training,
      user
    }

    if (type === DOC_TYPE.CERTIFICATE) {
      generateCertificate(trainingId, payload)
        .then((res) => {
          const data = {
            message: `${res.data.Subject} Certificate generated Successfully!`
          }
          apiMessage({ data })
          setRefresh((r) => !r)
        })
        .catch((e) => apiMessage(e))
    } else {
      generateIdCard(trainingId, payload)
        .then((res) => {
          apiMessage(res)
          setRefresh((r) => !r)
        })
        .catch((e) => apiMessage(e))
    }
  }

  const handlePrint = (e) => {
    e.preventDefault()
    const windowFeatures = `left=100,top=100,width=${window.innerWidth},height=${window.innerHeight}`
    window.open(documentUrl, '_blank', windowFeatures)
  }

  return (
    <Task
      title={type === DOC_TYPE.CERTIFICATE ? 'Certificate' : 'ID Card'}
      className="document"
      approveLabel={isCertificate ? 'Re-generate' : 'Generate'}
      approveDisabled={!user.roles.find((r) => r.id === 1) && isCertificate}
      rejectLabel="Print"
      onApprove={
        user.roles.find((r) => r.id === 1) && isCertificate
          ? handleGenerate
          : null
      }
      onReject={handlePrint}
      rejectDisabled={!training?.certificate}
    >
      {isCertificate && (
        <figure>
          <img
            src="/assets/certificate_img.jpg"
            className="document-image"
            alt={getFilename(trainingId)}
          />
          <figcaption>{getFilename(trainingId)}</figcaption>
        </figure>
      )}
    </Task>
  )
}
