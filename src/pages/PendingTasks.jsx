import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '@/components'

const PendingTasks = () => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
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
