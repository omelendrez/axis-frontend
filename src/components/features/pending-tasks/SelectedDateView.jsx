import { formatFullDate } from '@/helpers'

export const SelectedDateView = ({ date, onClick }) => (
  <div className="pending-tasks-date" onClick={onClick}>
    <div>{formatFullDate(date)}</div>
    <div>
      <span className="material-icons">calendar_month</span>
    </div>
  </div>
)
