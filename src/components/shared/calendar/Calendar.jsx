import CalendarComponent from 'react-calendar'
// import 'react-calendar/dist/Calendar.css'
import './calendar.css'

export const Calendar = ({ onChange, value }) => {
  return <CalendarComponent onChange={onChange} value={value} />
}
