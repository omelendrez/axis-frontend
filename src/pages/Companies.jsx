import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Companies as CompaniesComponent,
  TableButtonRow,
  Loading
} from '../components'
import useUsers from '../hooks/useCompanies'
import useNoficication from '../hooks/useNotification'

const Companies = () => {
  const { companies, load: loadCompanies, remove: removeCompany } = useUsers()
  const { data, isLoading, isSuccess, isError, error } = companies

  const navigate = useNavigate()
  const { set } = useNoficication()

  useEffect(() => {
    if (!data.length) {
      loadCompanies()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companies])

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
          <li>Companies</li>
        </ul>
      </nav>

      <TableButtonRow url="/company" label="Add company" />

      <CompaniesComponent
        companies={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        loadCompanies={loadCompanies}
      />
    </main>
  )
}

export default Companies
