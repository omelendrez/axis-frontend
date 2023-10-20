import './rejectReasonView.css'

export const RejectReasonView = ({ status, reason }) => {
  const statusName = status.toLowerCase()
  return (
    <article className="exit-reason">
      <div className={`title ${statusName}`}>
        {`record ${statusName === 'cancelled' ? status : 'rejected'} `}
      </div>
      <div className="reason">{reason}</div>
    </article>
  )
}
