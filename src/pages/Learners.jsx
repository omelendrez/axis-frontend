import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, CardList, AddButton } from '../components'
import useLearners from '../hooks/useLearners'
import useNoficication from '../hooks/useNotification'
import { initialValues } from '../helpers'

const Learners = () => {
  const { learners, load: loadLearners } = useLearners()
  const { data, isLoading, isSuccess, isError, error, isFirstLoad } = learners

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNoficication()

  useEffect(() => {
    loadLearners(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    if (isFirstLoad) {
      loadLearners(pagination)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstLoad])

  useEffect(() => {
    if (isError) {
      const notification = {
        type: 'error',
        message: error.message
      }
      set(notification)
    }
    if (isSuccess) {
      const notification = {
        type: 'success',
        message: 'Operation completed successfully'
      }
      set(notification)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess])

  const handleView = (learner) => {
    navigate(`/learner/${learner.id}`)
  }

  const fields = [
    { name: 'type', label: 'Type' },
    { name: 'badge', label: 'Badge' },
    {
      name: 'full_name',
      label: 'Full name',
      noWrap: true,
      ellipsis: true,
      maxWidth: '12.5rem'
    },
    {
      name: 'company_name',
      label: 'Company',
      noWrap: true,
      ellipsis: true,
      maxWidth: '9.375rem'
    }
  ]

  return (
    <main className="container">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>Learners</li>
        </ul>
      </nav>

      <AddButton url="/learner/add" />

      <CardList
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onView={handleView}
        isLoading={isLoading}
        loadItems={loadLearners}
      />
    </main>
  )
}

export default Learners