import { useEffect, useState } from 'react'
import { Task } from '../../Task'
import { frontdeskApproval } from '../../../../../services/api/approvals'
import './scanId.css'
import useApiMessages from '../../../../../hooks/useApiMessages'
import { TRAINING_STATUS } from '../../../../../helpers'

export const ScanId = ({ training, onUpdate }) => {
  const { apiMessage } = useApiMessages()

  const [selectedFile, setSelectedFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [preview, setPreview] = useState(null)

  const { id, status_id: status } = training

  const isCancelled = status === TRAINING_STATUS.CANCELLED

  const process = (payload) => {
    setIsSubmitting(true)

    frontdeskApproval(id, payload)
      .then((res) => {
        onUpdate()
        apiMessage(res)
      })
      .catch((e) => apiMessage(e))
      .finally(() => setIsSubmitting(false))
  }

  const handleApprove = (e) => {
    e.preventDefault()
    process({
      approved: 1
    })
  }

  const handleReject = (e) => {
    e.preventDefault()
    process({
      approved: 0
    })
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files) {
      const file = e.target.files[0]
      // if (file?.size > MAX_FILE_SIZE) {
      //   const notification = {
      //     type: 'error',
      //     message: `Image size too big (${Math.ceil(
      //       file.size / 1000
      //     )}K). Image size cannot be bigger than ${Math.ceil(
      //       MAX_FILE_SIZE / 1000
      //     )}K`
      //   }
      //   setSelectedFile(null)
      //   return set(notification)
      // }

      setSelectedFile(file)
    }
  }

  useEffect(() => {
    if (selectedFile) {
      const preview = (
        window.URL ||
        window.webkitURL ||
        window ||
        {}
      ).createObjectURL(selectedFile)

      setPreview(preview)
    }
  }, [selectedFile])

  return (
    <Task
      title="Identification"
      className="scan-id"
      onApprove={handleApprove}
      onReject={handleReject}
      approveDisabled={!preview || isCancelled}
      rejectDisabled={isCancelled}
      isSubmitting={isSubmitting}
    >
      <input
        type="file"
        accept="image/*"
        id="file"
        onChange={handleChange}
        disabled={isCancelled}
      />
      {preview ? (
        <img src={preview} alt="selected" className="preview" />
      ) : (
        <div></div>
      )}
    </Task>
  )
}
