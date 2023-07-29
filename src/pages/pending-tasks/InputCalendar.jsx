import { Calendar } from '@/components'

import { isNewer, isEqual } from '@/helpers'
export const InputCalendar = ({ date, setToday, onChange }) => (
  <section className="pending-tasks-calendar">
    <Calendar
      onChange={onChange}
      date={date}
      tileDisabled={({ date }) => isNewer(date)}
    />
    <button
      className="calendar-today-button"
      onClick={setToday}
      disabled={isEqual(date)}
    >
      Today
    </button>
  </section>
)
