import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { TrainingView } from '@/components'
import { TrainingContext } from '@/context'

import useTrainings from '@/hooks/useTrainings'

const Training = () => {
  const params = useParams()

  const { changes } = useContext(TrainingContext)

  const { loadView, trainings } = useTrainings()

  const { view } = trainings

  const [update, setUpdate] = useState(false)

  const updateView = () => setUpdate((u) => !u)

  useEffect(() => {
    const id = params?.id

    loadView(id)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update, changes])

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
          <li>Training</li>
        </ul>
      </nav>
      {view?.id && <TrainingView training={view} onUpdate={updateView} />}
    </main>
  )
}

export default Training
