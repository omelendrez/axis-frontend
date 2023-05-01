import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {
  Divider,
  FormContainer,
  Trainee as TraineeComponent,
  Training,
  ContactInfo
} from '../components'
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

  const handleAdd = (e) => {
    e.preventDefault()
    console.log('Adding', e)
  }

  const handleEdit = (trainee) => console.log('Editing', trainee)

  const handleDelete = (trainee) => console.log('Deleting', trainee)

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

        <FormContainer title="Trainee data">
          <TraineeComponent trainee={trainee} />
        </FormContainer>

        <Divider />

        <FormContainer title="Contact info">
          <ContactInfo
            trainee={trainee}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </FormContainer>

        <Divider />

        <FormContainer title="Training" noMobile>
          <Training
            trainee={trainee}
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </FormContainer>
      </main>
    </>
  )
}

export default Trainee
