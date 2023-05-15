import { useState } from 'react'
import useNoficication from '../../hooks/useNotification'
import './photo.css'

const MAX_FILE_SIZE = 70000

export const Photo = () => {
  const [selectedFile, setSelectedFile] = useState(null)
  const { set } = useNoficication()

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files) {
      const file = e.target.files[0]
      if (file?.size > MAX_FILE_SIZE) {
        const notification = {
          type: 'error',
          message: `File size to big ${Math.ceil(
            file.size / 1000
          )} Kb. Max size allowed ${Math.ceil(MAX_FILE_SIZE / 1000)} Kb`
        }
        setSelectedFile(null)
        return set(notification)
      }
      setSelectedFile(file)
    }
  }

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

  const objectUrl = !selectedFile
    ? undefined
    : window.URL.createObjectURL(selectedFile)

  return (
    <form className="photo-form">
      <div>
        <label htmlFor="file">Choose file to upload</label>
        <input type="file" accept="image/*" id="file" onChange={handleChange} />
      </div>
      <div className="preview">
        {objectUrl ? <img src={objectUrl} alt="selected" /> : <div></div>}
      </div>
      <div className="button-container">
        <button onClick={handleUpload} disabled={!selectedFile}>
          Submit
        </button>
      </div>
    </form>
  )
}
