import { useEffect, useState } from 'react'
import compareDesc from 'date-fns/compareDesc'

import { Loading, Calendar } from '@/components'

import usePage from '@/hooks/usePage'

import { formatYMD } from '@/helpers'

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

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <article className="pending-tasks">
        <Calendar
          onChange={setDate}
          value={date}
          tileDisabled={({ date }) => compareDesc(new Date(), date) > 0}
        />
        <button
          className="calendar-today-button"
          onClick={() => setDate(new Date())}
        >
          Today
        </button>
      </article>
    </main>
  )
}

export default PendingTasks
