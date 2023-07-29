import { InputStatus, InputCalendar } from './'

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
      <button onClick={onConfirm}>Go</button>
    </div>
  </article>
)
