import { useEffect, useState } from 'react'
import { Tag } from '@/components'

import { uploadLearnerId } from '@/services'

import './photo.css'

import useApiMessages from '@/hooks/useApiMessages'

export const IdCardUpload = ({ badge, onClose }) => {
  const { apiMessage } = useApiMessages()
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

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
    const formData = new FormData()
    formData.append('name', badge)
    formData.append('file', selectedFile)
    uploadLearnerId(formData)
      .then((res) => {
        setPreview(res.data)
        apiMessage(res)
        onClose()
      })
      .catch((e) => apiMessage(e))
  }

  return (
    <div className="photo-form">
      <div>
        <label htmlFor="file">
          Choose file to upload or take a picture (mobile)
        </label>
        <input type="file" accept="image/*" id="file" onChange={handleChange} />
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
