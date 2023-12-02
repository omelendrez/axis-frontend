import { useEffect, useState } from 'react'
import { Tag } from '@/components'

import useApiMessages from '@/hooks/useApiMessages'

import { uploadPayment } from '@/services'

import { UPLOAD_ACCEPT, validateFileExtension } from '@/helpers'

import './payment.css'

export const PaymentUpload = ({ fileName, onClose }) => {
  const { apiMessage } = useApiMessages()
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const accept = UPLOAD_ACCEPT.JPG

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files) {
      const file = e.target.files[0]
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

  const handleUpload = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    validateFileExtension(selectedFile, accept)
      .then(() => {
        const formData = new FormData()
        formData.append('name', fileName)
        formData.append('file', selectedFile)
        uploadPayment(formData)
          .then((res) => {
            apiMessage(res)
            onClose()
          })
          .catch((e) => apiMessage(e))
          .finally(() => setIsSubmitting(false))
      })
      .catch((error) => {
        apiMessage(error)
      })
  }

  return (
    <div className="photo-form">
      <div>
        <label htmlFor="file">
          Choose file to upload or take a picture (mobile)
        </label>
        <input type="file" accept={accept} id="file" onChange={handleChange} />
      </div>
      <div className="preview">
        {preview ? <img src={preview} alt="selected" /> : <div></div>}
      </div>
      <div className="button-container">
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isSubmitting}
          aria-busy={isSubmitting}
        >
          Submit
        </button>
      </div>
      <Tag>{fileName}</Tag>
    </div>
  )
}
