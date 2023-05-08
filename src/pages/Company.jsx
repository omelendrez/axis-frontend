import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Company as CompanyComponent } from '../components'
import { getCompany } from '../services'

const Company = () => {
  const params = useParams()
  const [company, setCompany] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getCompany(id).then((res) => setCompany(res.data))
    }
  }, [params])

  return (
    <main className="container">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/companies">Companies</Link>
          </li>
          <li>Company</li>
        </ul>
      </nav>
      <article className="form-container">
        <CompanyComponent company={company} />
      </article>
    </main>
  )
}

export default Company
