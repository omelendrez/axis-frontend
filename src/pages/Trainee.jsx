import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { TraineeView } from '../components'
import { getTrainee } from '../services'

const Trainee = () => {
  const params = useParams()
  const [trainee, setTrainee] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getTrainee(id).then((res) => setTrainee(res.data))
    }
  }, [params])

  // Contact Info

  const handleAddContact = (e) => {
    e.preventDefault()
    console.log('Adding', e)
  }

  const handleEditContact = (contact) => {
    console.log('Editing', contact)
  }

  const handleDeleteContact = (contact) => {
    console.log('Deleting', contact)
  }

  // Trainings

  const handleAddTraining = (e) => {
    e.preventDefault()
    console.log('Adding')
  }

  const handleEditTraining = (training) => {
    console.log('Editing', training)
  }
  const handleDeleteTraining = (training) => {
    console.log('Deleting', training)
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
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/trainees">Trainees</Link>
            </li>
            <li>Trainee</li>
          </ul>
        </nav>

        {/* <FormContainer title="Trainee data">
          <TraineeComponent trainee={trainee} />
        </FormContainer>

        <Divider />

        <FormContainer title="Contact info">
          <ContactInfos
            trainee={trainee}
            onAdd={handleAddContact}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
          />
        </FormContainer>

        <Divider />

        <FormContainer title="Training records">
          <Trainings
            noMobile
            trainee={trainee}
            onAdd={handleAddTraining}
            onEdit={handleEditTraining}
            onDelete={handleDeleteTraining}
          />
        </FormContainer> */}
        <TraineeView trainee={trainee} />
      </main>
    </>
  )
}

export default Trainee
