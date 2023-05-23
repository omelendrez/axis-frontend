import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
  FormContainer,
  LearnerView,
  Learner as LearnerComponent
} from '../components'
import { getLearner } from '../services'
import { handleError } from '../reducers/error'

const Learner = ({ isViewing, isAdding, isEditing }) => {
  const params = useParams()
  const [learner, setLearner] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const id = params?.id
    if (id) {
      getLearner(id)
        .then((res) => setLearner(res.data))
        .catch((e) => handleError(e))
    }
  }, [params])

  const handleClose = (e) => {
    e.preventDefault()
    navigate('/learners')
  }

  return (
    <>
      <main className="container">
        <nav aria-label="breadcrumb" className="breadcrumb">
          <ul>
            <li>
              <Link to="/">Home</Link>
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
            <LearnerComponent onClose={handleClose} />
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
