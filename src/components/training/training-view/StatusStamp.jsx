import './statusStamp.css'

export const StatusStamp = ({ status: { statusId, stateName } }) => (
  <div className="alert-status-container">
    <div className={`alert-status status-${statusId}`}>{stateName}</div>
  </div>
)
