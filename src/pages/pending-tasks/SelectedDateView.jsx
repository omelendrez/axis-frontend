import { formatFullDate } from '@/helpers'

export const SelectedDateView = ({ date, onClick }) => (
  <div className="pending-tasks-date">
    <div>{formatFullDate(date)}</div>
    <div onClick={onClick}>
      <span className="material-icons">calendar_month</span>
    </div>
  </div>
)
