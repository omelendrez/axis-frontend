import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
  FormContainer,
  LearnerView,
  Learner as LearnerComponent
} from '../components'
import { getLearner } from '../services'

const Learner = ({ isViewing, isAdding, isEditing }) => {
  const params = useParams()
  const [learner, setLearner] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getLearner(id).then((res) => setLearner(res.data))
    }
  }, [params])

  return (
    <>
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
              <Link to="/learners">Learners</Link>
            </li>
            <li>Learner</li>
          </ul>
        </nav>

        {isViewing && <LearnerView learner={learner} />}

        {isAdding && (
          <FormContainer title="Adding Learner data">
            <LearnerComponent />
          </FormContainer>
        )}
        {isEditing && (
          <FormContainer title="Modifying Learner data">
            <LearnerComponent learner={learner} />
          </FormContainer>
        )}
      </main>
    </>
  )
}

export default Learner
