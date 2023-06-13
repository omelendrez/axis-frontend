import { Task } from '../../Task'
import './payment.css'
import description from './description'

export const Payment = () => {
  const handleApprove = (e) => {
    e.preventDefault()
    console.log('approved')
  }

  const handleReject = (e) => {
    e.preventDefault()
    console.log('rejected')
  }

  return (
    <Task
      title="Payment"
      description={description}
      className="payment"
      onApprove={handleApprove}
      onReject={handleReject}
      approveLabel="Paid"
      rejectLabel="Not paid"
    ></Task>
  )
}
