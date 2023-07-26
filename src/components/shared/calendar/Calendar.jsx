import CalendarComponent from 'react-calendar'
// import 'react-calendar/dist/Calendar.css'
import './calendar.css'

export const Calendar = ({ onChange, date, tileDisabled }) => {
  return (
    <CalendarComponent
      onChange={onChange}
      value={date}
      tileDisabled={tileDisabled}
    />
  )
}
