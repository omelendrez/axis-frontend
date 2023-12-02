import { InputStatus, InputCalendar } from './input-parameters'

export const InputParameters = ({
  date,
  setToday,
  onCalendarChange,
  onStatusChange,
  statuses,
  selectedStatuses,
  onConfirm,
  onClose,
  selecteAllNone,
  records
}) => {
  return (
    <article className="pending-tasks-container">
      <InputCalendar
        date={date}
        setToday={setToday}
        onChange={onCalendarChange}
      />
      <InputStatus
        statuses={statuses}
        onChange={onStatusChange}
        selected={selectedStatuses}
        setPending={selecteAllNone}
      />
      <div className="pending-tasks-confirm-button-container">
        <button
          className="pending-tasks-confirm-button"
          onClick={onConfirm}
          disabled={records === 0 || selectedStatuses.length === 0}
        >
          load pending tasks
        </button>
      </div>
      <div className="close-button" onClick={onClose}>
        X
      </div>
      <div className={`records-found ${records === 0 ? 'empty' : ''}`}>
        {records} records found
      </div>
    </article>
  )
}
