import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { State as StateComponent } from '../components'
import { getState } from '../services'
import { getApiErrorMessage, log } from '../helpers'
import useNoficication from '../hooks/useNotification'

const State = () => {
  const params = useParams()
  const { id } = params

  const [state, setState] = useState(null)
  const { set } = useNoficication()

  useEffect(() => {
    if (id) {
      getState(id)
        .then((res) => {
          setState(res.data)
        })
        .catch((e) => {
          log.error(e)
          const message = getApiErrorMessage(e)
          const notification = {
            type: 'error',
            message
          }
          set(notification)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <article className="form-container">
        <StateComponent state={state} />
      </article>
    </main>
  )
}

export default State
