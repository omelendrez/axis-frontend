import { useEffect, useState } from 'react'
import { Tag } from '@/components'

import useApiMessages from '@/hooks/useApiMessages'

import { uploadCertificate } from '@/services'

import { UPLOAD_ACCEPT } from '@/helpers'

import './certificateUpload.css'

export const CertificateUpload = ({ fileName, onClose }) => {
  const { apiMessage } = useApiMessages()
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

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

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files) {
      const file = e.target.files[0]

      setSelectedFile(file)
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', fileName)
    formData.append('file', selectedFile)

    uploadCertificate(formData)
      .then((res) => {
        apiMessage(res)
        onClose()
      })
      .catch((e) => apiMessage(e))
  }

  return (
    <div className="certificate-upload-form">
      <div>
        <label htmlFor="file">Choose file to upload</label>
        <input
          type="file"
          accept={UPLOAD_ACCEPT.PDF}
          id="file"
          onChange={handleChange}
        />
      </div>
      <div className="preview">
        {preview ? <img src={preview} alt="selected" /> : <div></div>}
      </div>
      <div className="button-container">
        <button onClick={handleUpload} disabled={!selectedFile}>
          Submit
        </button>
      </div>
      <Tag className="inverted">{fileName}</Tag>
    </div>
  )
}
