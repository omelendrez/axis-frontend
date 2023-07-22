import CalendarComponent from 'react-calendar'
// import 'react-calendar/dist/Calendar.css'
import './calendar.css'

export const Calendar = ({ onChange, value, tileDisabled }) => {
  return (
    <CalendarComponent
      onChange={onChange}
      value={value}
      tileDisabled={tileDisabled}
    />
  )
}
