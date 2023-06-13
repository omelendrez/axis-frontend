import './task.css'

export const Task = ({
  title,
  description,
  className,
  approveDisabled,
  onApprove,
  rejectDisabled,
  onReject,
  approveLabel,
  rejectLabel,
  children
}) => {
  return (
    <article className={className}>
      <h6 className="title">{title}</h6>
      <div className="children">{children}</div>

      <article className="description">{description}</article>

      <div className="buttons">
        {onApprove && (
          <button onClick={onApprove} disabled={approveDisabled}>
            {approveLabel || 'Approve'}
          </button>
        )}
        {onReject && (
          <button
            onClick={onReject}
            disabled={rejectDisabled}
            className="delete"
          >
            {rejectLabel || 'Reject'}
          </button>
        )}
      </div>
    </article>
  )
}
