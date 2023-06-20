import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, ListView, AddButton } from '@/components'

import useNationalities from '@/hooks/useNationalities'
import useNotification from '@/hooks/useNotification'

import { initialValues } from '@/helpers'

const Nationalities = () => {
  const {
    nationalities,
    load: loadNationalities,
    remove: removeNationality
  } = useNationalities()
  const { data, isLoading, isSuccess, isError, error, isFirstLoad } =
    nationalities

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNotification()

  useEffect(() => {
    loadNationalities(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    if (isFirstLoad) {
      loadNationalities(pagination)
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
    <main className="container">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Nationalities</li>
        </ul>
      </nav>
      <AddButton url="/nationality" />

      <ListView
        data={data}
        pagination={pagination}
        onPagination={setPagination}
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
