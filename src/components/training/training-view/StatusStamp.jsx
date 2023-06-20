import './statusStamp.css'

export const StatusStamp = ({ statusId, statusName }) => (
  <div className="alert-status-container">
    <div className={`alert-status status-${statusId}`}>{statusName}</div>
  </div>
)
