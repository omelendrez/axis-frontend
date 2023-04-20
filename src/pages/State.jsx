import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { State as StateComponent } from '../components'
import { getState } from '../services'

const State = () => {
  const params = useParams()
  const [state, setState] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getState(id).then((res) => {
        setState(res.data)
      })
    }
  }, [params])

  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/States">States</Link>
          </li>
          <li>State</li>
        </ul>
      </nav>
      <StateComponent state={state} />
    </main>
  )
}

export default State