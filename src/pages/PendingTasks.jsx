import { useEffect, useState } from 'react'
import { Loading, Calendar } from '@/components'
import usePage from '@/hooks/usePage'
import { formatYMD } from '@/helpers'
import compareDesc from 'date-fns/compareDesc'
import './pendingTasks.css'

const PendingTasks = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(new Date())

  const { set: setPage } = usePage()

  useEffect(() => {
    setPage('Pending Tasks')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setIsLoading(true)
    console.log(formatYMD(date))
    setIsLoading(false)
  }, [date])

  const tileDisabled = ({ date, view }) => {
    // Disable tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of disabled dates
      return compareDesc(new Date(), date) > 0
    }
  }

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <article className="pending-tasks">
        <div>
          <Calendar
            onChange={setDate}
            value={date}
            tileDisabled={tileDisabled}
          />
          <button
            className="calendar-today-button"
            onClick={() => setDate(new Date())}
          >
            Today
          </button>
        </div>
      </article>
    </main>
  )
}

export default PendingTasks
