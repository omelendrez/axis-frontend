import { InputStatus, InputCalendar } from './input-parameters'

export const InputParameters = ({
  date,
  setToday,
  onCalendarChange,
  onStatusChange,
  statuses,
  selected,
  onConfirm
}) => (
  <article className="pending-tasks-container">
    <InputCalendar
      date={date}
      setToday={setToday}
      onChange={onCalendarChange}
    />
    <InputStatus
      statuses={statuses}
      onChange={onStatusChange}
      selected={selected}
    />
    <div className="pending-tasks-confirm-button-container">
      <button className="pending-tasks-confirm-button" onClick={onConfirm}>
        load pending tasks
      </button>
    </div>
  </article>
)