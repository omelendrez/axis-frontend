import { useEffect, useState } from 'react'
import { Task } from '../../Task'
import './scanId.css'

export const ScanId = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleApprove = (e) => {
    e.preventDefault()
    console.log('approved')
  }

  const handleReject = (e) => {
    e.preventDefault()
    console.log('rejected')
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
      title="Scan ID card"
      className="scan-id"
      onApprove={handleApprove}
      onReject={handleReject}
      approveDisabled={!preview}
      rejectDisabled={!preview}
    >
      <input type="file" accept="image/*" id="file" onChange={handleChange} />
      {preview ? (
        <img src={preview} alt="selected" className="preview" />
      ) : (
        <div></div>
      )}
    </Task>
  )
}
