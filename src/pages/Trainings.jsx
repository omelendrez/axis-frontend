import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, CardList, Card } from '@/components'

import useTrainings from '@/hooks/useTrainings'
import usePagination from '@/hooks/usePagination'

import './trainings-card.css'
import usePage from '@/hooks/usePage'

const Trainings = () => {
  const navigate = useNavigate()
  const { pagination, setPagination } = usePagination()
  const { trainings, load: loadTrainings } = useTrainings()
  const { data, isLoading } = trainings

  const { set: setPage } = usePage()

  useEffect(() => {
    loadTrainings({ pagination })
    setPage('Trainings')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  const handleView = (id) => {
    navigate(`/training/${id}`)
  }

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Trainings</li>
        </ul>
      </nav>

      <CardList
        Card={Card}
        data={data}
        onView={handleView}
        isLoading={isLoading}
        pagination={pagination}
        onPagination={setPagination}
      />
    </main>
  )
}

export default Trainings
