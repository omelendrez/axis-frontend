import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListView, Loading, AddButton } from '@/components'

import useCompanies from '@/hooks/useCompanies'
import useNotification from '@/hooks/useNotification'

import { initialValues } from '@/helpers'

const Companies = () => {
  const {
    companies,
    load: loadCompanies,
    remove: removeCompany
  } = useCompanies()
  const { data, isLoading, isSuccess, isError, error } = companies

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNotification()

  useEffect(() => {
    loadCompanies(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

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

  const handleEdit = (company) => {
    navigate(`/company/${company.id}`)
  }

  const handleDelete = (company) => {
    removeCompany(company.id)
  }

  const fields = [{ name: 'name', label: 'Name' }]

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Companies</li>
        </ul>
      </nav>

      <AddButton url="/company" />

      <ListView
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </main>
  )
}

export default Companies
