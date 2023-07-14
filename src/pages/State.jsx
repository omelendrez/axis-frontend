import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { State as StateComponent } from '@/components'
import { getState } from '@/services'
import useApiMessages from '@/hooks/useApiMessages'

const State = () => {
  const params = useParams()
  const { apiMessage } = useApiMessages()
  const [state, setState] = useState(null)

  useEffect(() => {
    const id = params?.id

    if (id) {
      getState(id)
        .then((res) => setState(res.data))
        .catch((e) => apiMessage(e))
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
