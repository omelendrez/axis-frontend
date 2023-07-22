import { useEffect, useState } from 'react'
import { Loading, Calendar } from '@/components'
import usePage from '@/hooks/usePage'

const PendingTasks = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [date, setDate] = useState(new Date())

  const { set: setPage } = usePage()

  useEffect(() => {
    setIsLoading(true)
    setPage('Pending Tasks')
    setTimeout(() => setIsLoading(false), 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <article className="pending-tasks">
        <div>Date: {new Date().toDateString()}</div>
        <div>
          <Calendar onChange={setDate} value={date} />
        </div>
      </article>
    </main>
  )
}

export default PendingTasks
