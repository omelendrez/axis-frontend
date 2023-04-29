import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, CardList, AddButton } from '../components'
import useTrainees from '../hooks/useTrainees'
import useNoficication from '../hooks/useNotification'
import { initialValues } from '../helpers'

const Trainees = () => {
  const { trainees, load: loadTrainees, remove: removeTrainee } = useTrainees()
  const { data, isLoading, isSuccess, isError, error, isFirstLoad } = trainees

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNoficication()

  useEffect(() => {
    loadTrainees(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    if (isFirstLoad) {
      loadTrainees(pagination)
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

  const handleEdit = (trainee) => {
    navigate(`/trainee/${trainee.id}`)
  }

  const handleDelete = (trainee) => {
    removeTrainee(trainee.id)
  }

  const handleView = (trainee) => {
    const notification = {
      type: 'info',
      message:
        'This functionality is still in progress. Thank you for your patience.'
    }
    set(notification)
  }

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
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
            <Link to="/dashboard" onClick={handleBack}>
              Dashboard
            </Link>
          </li>
          <li>Trainees</li>
        </ul>
      </nav>

      <AddButton url="/trainee" />

      <CardList
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        isLoading={isLoading}
        loadItems={loadTrainees}
      />
    </main>
  )
}

export default Trainees
