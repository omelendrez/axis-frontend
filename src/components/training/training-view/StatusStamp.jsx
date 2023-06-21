import './statusStamp.css'

export const StatusStamp = ({ status: { statusId, statusName } }) => (
  <div className="alert-status-container">
    <div className={`alert-status status-${statusId}`}>{statusName}</div>
  </div>
)
