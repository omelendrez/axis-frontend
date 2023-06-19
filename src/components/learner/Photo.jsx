import { useEffect, useState } from 'react'
import { Tag } from '../shared'

import { uploadPhoto } from '../../services/assets'
// import { MAX_FILE_SIZE } from '../../helpers/photo'
import './photo.css'

import useApiMessages from '../../hooks/useApiMessages'

export const Photo = ({ badge, onClose }) => {
  const { apiMessage } = useApiMessages()
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

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

  const handleUpload = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', badge)
    formData.append('file', selectedFile)
    uploadPhoto(formData)
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
        <label htmlFor="file">Choose file to upload</label>
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
