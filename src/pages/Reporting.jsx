import { Link, useNavigate } from 'react-router-dom'

import { CardList } from '@/components'

import usePagination from '@/hooks/usePagination'
import usePage from '@/hooks/usePage'

import './reporting.css'
import { useEffect } from 'react'

import reports from './reporting.json'

const Card = ({ item, onView }) => (
  <article className="card option" onClick={() => onView(item)}>
    <div className="icon">
      <span className="material-icons">{item.icon}</span>
    </div>
    <div className="card-body">
      <div className="name">{item.name}</div>
      <div className="description">{item.description}</div>
    </div>
  </article>
)

const Reporting = () => {
  const navigate = useNavigate()
  const { pagination, setPagination } = usePagination()
  const { set: setPage } = usePage()
  const handleView = (item) => navigate(item.path)

  useEffect(() => {
    setPage('Reporting')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const data = {
    rows: reports,
    count: reports.length
  }
  return (
    <main className="container reporting">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Reporting</li>
        </ul>
      </nav>

      <CardList
        Card={Card}
        data={data}
        onView={handleView}
        pagination={pagination}
        onPagination={setPagination}
        noSearch
        noPagination
      />
    </main>
  )
}

export default Reporting
