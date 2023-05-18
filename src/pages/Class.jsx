import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Class as ClassComponent } from '../components'
import { getClass } from '../services'
import { handleError } from '../reducers/error'

const Class = () => {
  const params = useParams()
  const [classroom, setClass] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getClass(id)
        .then((res) => setClass(res.data))
        .catch((e) => handleError(e))
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
            <Link to="/classes">Classes</Link>
          </li>
          <li>Class</li>
        </ul>
      </nav>
      <article className="form-container">
        <ClassComponent classroom={classroom} />
      </article>
    </main>
  )
}

export default Class
