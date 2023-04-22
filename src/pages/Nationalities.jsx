import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TableButtonRow, Loading, ListView } from '../components'

import useNationalities from '../hooks/useNationalities'
import useNotification from '../hooks/useNotification'

const Nationalities = () => {
  const {
    nationalities,
    load: loadNationalities,
    remove: removeNationality
  } = useNationalities()
  const { data, isLoading, isSuccess, isError, error } = nationalities

  const navigate = useNavigate()
  const { set } = useNotification()

  useEffect(() => {
    if (!data.length) {
      loadNationalities()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nationalities])

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

  const handleEdit = (nationality) => {
    navigate(`/nationality/${nationality.id}`)
  }

  const handleDelete = (nationality) => {
    removeNationality(nationality.id)
  }

  const fields = [
    { name: 'code', label: 'Code' },
    { name: 'country', label: 'Country' },
    { name: 'nationality', label: 'Nationality' }
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
          <li>Nationalities</li>
        </ul>
      </nav>
      <TableButtonRow url="/nationality" label="Add nationality" />

      <ListView
        items={data}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        loadItems={loadNationalities}
      />
    </main>
  )
}

export default Nationalities
