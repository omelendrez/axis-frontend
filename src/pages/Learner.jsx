import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { FormContainer, LearnerView, LearnerForm } from '@/components'
import { getLearner } from '@/services'
import useApiMessages from '@/hooks/useApiMessages'

const Learner = ({ isViewing, isAdding, isEditing }) => {
  const params = useParams()
  const { apiMessage } = useApiMessages()
  const [learner, setLearner] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const id = params?.id
    if (id) {
      getLearner(id)
        .then((res) => setLearner(res.data))
        .catch((e) => apiMessage(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const handleClose = () => navigate('/learners')

  return (
    <main className="container-fluid">
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
          <LearnerForm onClose={handleClose} />
        </FormContainer>
      )}
      {isEditing && (
        <FormContainer title="Modifying Learner data">
          <LearnerForm learner={learner} onClose={handleClose} />
        </FormContainer>
      )}
    </main>
  )
}

export default Learner
