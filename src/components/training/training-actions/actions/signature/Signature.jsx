import { useEffect, useRef, useState } from 'react'
import SignatureCanvas from 'react-signature-canvas'
import { Modal, Task } from '@/components'
import useApiMessages from '@/hooks/useApiMessages'
import { uploadSignature } from '@/services'
import {
  TRAINING_STATUS,
  getSignatureFilename,
  lock,
  unlock,
  dataURItoBlob
} from '@/helpers'

import './signature.css'

export const Signature = ({ training }) => {
  const signatureCanvas = useRef()

  const { apiMessage } = useApiMessages()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isSignatureOpen, setIsSignatureOpen] = useState(false)

  const [signature, setSignature] = useState(null)

  const { id, status_id: status, start } = training

  const isCancelled = status === TRAINING_STATUS.CANCELLED

  useEffect(() => {
    if (signature) {
      const formData = new FormData()

      formData.append(
        'name',
        getSignatureFilename({
          id,
          date: start.split('-').join('')
        })
      )

      formData.append('file', signature)

      uploadSignature(formData)
        .then((res) => {
          apiMessage(res)
          handleClose()
        })
        .catch((e) => apiMessage(e))
        .finally(() => setIsSubmitting(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature])

  const handleSave = () => {
    setIsSubmitting(true)
    setSignature(
      dataURItoBlob(signatureCanvas.current.getCanvas().toDataURL('image/png'))
    )
  }

  const handleScan = (e) => {
    e.preventDefault()

    lock()
    setIsSignatureOpen(true)
    handleClear()
  }

  const handleClose = (e) => {
    e?.preventDefault()

    handleClear()
    unlock()
    setIsSignatureOpen(false)
  }

  const handleClear = (e) => {
    e?.preventDefault()
    signatureCanvas.current.clear()
  }

  const title = <strong>Learner Signature</strong>

  const canvasProps = {
    className: 'signature-canvas',
    height: window.visualViewport.height - 200,
    width: window.visualViewport.width - 100
  }

  return (
    <>
      <Task title={title} className="signature" isSubmitting={isSubmitting}>
        <div className="signature-children">
          <div className="buttons">
            <button onClick={handleScan} disabled={isCancelled}>
              Take signature
            </button>
          </div>
        </div>

        <Modal open={isSignatureOpen} onClose={handleClose}>
          <div className="form-container">
            <SignatureCanvas
              ref={signatureCanvas}
              penColor="blue"
              canvasProps={canvasProps}
              backgroundColor="rgba(255, 255, 255, 1)"
            />
            <div className="buttons">
              <button onClick={handleSave} disabled={isCancelled}>
                save
              </button>
              <button onClick={handleClear} disabled={isCancelled}>
                Clear
              </button>
            </div>
          </div>
        </Modal>
      </Task>
    </>
  )
}
