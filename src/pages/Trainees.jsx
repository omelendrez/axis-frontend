import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TableButtonRow, Loading, ListView } from '../components'
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

  const fields = [
    { name: 'type', label: 'Type' },
    { name: 'badge', label: 'Badge' },
    {
      name: 'full_name',
      label: 'Full name',
      noWrap: true,
      ellipsis: true,
      maxWidth: 150
    },
    { name: 'state_name', label: 'State' },
    { name: 'nationality_name', label: 'Nationality' },
    { name: 'birth_date', label: 'Birth date', noWrap: true },
    {
      name: 'company_name',
      label: 'Company',
      noWrap: true,
      ellipsis: true,
      maxWidth: 150
    }
  ]

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>Trainees</li>
        </ul>
      </nav>

      <TableButtonRow url="/trainee" label="Add trainee" />

      <ListView
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        loadItems={loadTrainees}
      />
    </main>
  )
}

export default Trainees
