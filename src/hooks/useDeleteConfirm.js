import { useState } from 'react'

const useDeleteConfirm = () => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)

  const [confirmMessage, setCofirmMessage] = useState('')

  const setMessage = (message) => {
    setCofirmMessage(message)
    setIsConfirmOpen(true)
  }

  const closeConfirm = () => {
    setCofirmMessage('')
    setIsConfirmOpen(false)
  }

  return {
    isConfirmOpen,
    confirmMessage,
    setMessage,
    closeConfirm
  }
}

export default useDeleteConfirm
