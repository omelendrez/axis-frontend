import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '@/components'
import usePage from '@/hooks/usePage'

const PendingTasks = () => {
  const [isLoading, setIsLoading] = useState(false)

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
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Pending Tasks</li>
        </ul>
      </nav>
    </main>
  )
}

export default PendingTasks
