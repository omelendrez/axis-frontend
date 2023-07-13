import './status.css'

export const Status = ({ trackingRecord }) => {
  if (!trackingRecord?.updated) {
    return null
  }
  return (
    <div className="status-container">
      <div className="status-body">
        <div>{trackingRecord.status}</div>
        <div>{trackingRecord.full_name}</div>
        <div>{trackingRecord.updated}</div>
      </div>
    </div>
  )
}
