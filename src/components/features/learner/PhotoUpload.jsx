import { useEffect, useState } from 'react'
import { Tag } from '@/components'

import useApiMessages from '@/hooks/useApiMessages'

import { UPLOAD_ACCEPT, validateFileExtension } from '@/helpers'

import { uploadPhoto } from '@/services'

import './photo.css'

export const PhotoUpload = ({ badge, onClose }) => {
  const { apiMessage } = useApiMessages()
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

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
    validateFileExtension(selectedFile, accept)
      .then(() => {
        const formData = new FormData()
        formData.append('name', badge)
        formData.append('file', selectedFile)
        console.log(formData)
        uploadPhoto(formData)
          .then((res) => {
            setPreview(res.data)
            apiMessage(res)
            onClose()
          })
          .catch((e) => apiMessage(e))
      })
      .catch((error) => {
        apiMessage(error)
      })
  }

  return (
    <div className="photo-form">
      <div>
        <label htmlFor="file">Choose file to upload</label>
        <input type="file" accept={accept} id="file" onChange={handleChange} />
      </div>
      <div className="preview">
        {preview ? <img src={preview} alt="selected" /> : <div></div>}
      </div>
      <div className="button-container">
        <button onClick={handleUpload} disabled={!selectedFile}>
          Submit
        </button>
      </div>
      <Tag>{badge}</Tag>
    </div>
  )
}
