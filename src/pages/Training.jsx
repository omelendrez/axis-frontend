import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { TrainingView } from '@/components'
import { TrainingContext } from '@/context'

import useTrainings from '@/hooks/useTrainings'
import usePage from '@/hooks/usePage'

const Training = () => {
  const params = useParams()
  const { set: setPage } = usePage()

  const { changes } = useContext(TrainingContext)

  const { loadView, trainings } = useTrainings()

  const { view: training } = trainings

  const [update, setUpdate] = useState(false)

  const updateView = () => setUpdate((u) => !u)

  useEffect(() => {
    const id = params?.id

    loadView(id)
    setPage(`${training?.full_name}`)

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
            <Link to="/trainings">Trainings</Link>
          </li>
          <li>Training</li>
        </ul>
      </nav>
      {training?.id && (
        <TrainingView training={training} onUpdate={updateView} />
      )}
    </main>
  )
}

export default Training
