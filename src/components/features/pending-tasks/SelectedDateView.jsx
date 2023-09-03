import { formatFullDate } from '@/helpers'

export const SelectedDateView = ({ date, onClick }) => (
  <div className="pending-tasks-date" onClick={onClick}>
    <div>{date ? formatFullDate(date) : 'No date selected'}</div>
    <div>
      <span className="material-icons">calendar_month</span>
    </div>
  </div>
)
