import './task.css'

export const Task = ({
  title,
  status,
  description,
  className,
  approveDisabled,
  onApprove,
  rejectDisabled,
  onReject,
  approveLabel,
  approveTooltip,
  rejectLabel,
  rejectTooltip,
  children,
  isSubmitting
}) => {
  return (
    <article className={className}>
      <h6 className="title">{title}</h6>
      <div className="children">{children}</div>

      {description && <article className="description">{description}</article>}

      <div className="buttons">
        {onApprove && (
          <button
            onClick={onApprove}
            disabled={approveDisabled}
            aria-busy={isSubmitting}
            data-tooltip={approveTooltip}
          >
            {approveLabel || 'Approve'}
          </button>
        )}
        {onReject && (
          <button
            onClick={onReject}
            disabled={rejectDisabled}
            className="delete"
            aria-busy={isSubmitting}
            data-tooltip={rejectTooltip}
          >
            {rejectLabel || 'Reject'}
          </button>
        )}
      </div>
      {status && status}
    </article>
  )
}
