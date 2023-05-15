import { useEffect, useState } from 'react'
import { Tag } from '../shared'
import useNoficication from '../../hooks/useNotification'
import { MAX_FILE_SIZE } from '../../helpers/photo'
import './photo.css'

export const Photo = ({ learner }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const { set } = useNoficication()

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files) {
      const file = e.target.files[0]
      if (file?.size > MAX_FILE_SIZE) {
        const notification = {
          type: 'error',
          message: `Image size too big (${Math.ceil(
            file.size / 1000
          )}K). Image size cannot be bigger than ${Math.ceil(
            MAX_FILE_SIZE / 1000
          )}K`
        }
        setSelectedFile(null)
        return set(notification)
      }

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

    const notification = {
      type: 'info',
      message: 'Still in progress'
    }

    set(notification)

    // // 👇 Uploading the selectedFile using the fetch API to the server
    // fetch(import.meta.env.VITE_ASSETS_URL, {
    //   method: 'POST',
    //   body: selectedFile,
    //   // 👇 Set headers manually for single selectedFile upload
    //   headers: {
    //     'content-type': selectedFile.type,
    //     'content-length': `${selectedFile.size}` // 👈 Headers need to be a string
    //   }
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err))
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
      <Tag>{learner.badge}</Tag>
    </div>
  )
}
