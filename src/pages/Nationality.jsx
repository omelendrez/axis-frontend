import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Nationality as NationalityComponent } from '@/components'
import { getNationality } from '@/services'

import useApiMessages from '@/hooks/useApiMessages'

const Nationality = () => {
  const params = useParams()
  const { apiMessage } = useApiMessages()
  const [nationality, setNationality] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getNationality(id)
        .then((res) => setNationality(res.data))
        .catch((e) => apiMessage(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Nationalities">Nationalities</Link>
          </li>
          <li>Nationality</li>
        </ul>
      </nav>
      <article className="form-container">
        <NationalityComponent nationality={nationality} />
      </article>
    </main>
  )
}

export default Nationality
