import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Trainee as TraineeComponent, Training } from '../components'
import { getTrainee } from '../services'
import { Modal } from '../components/shared/modal/Modal'

const Trainee = () => {
  const params = useParams()
  const [trainee, setTrainee] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getTrainee(id).then((res) => setTrainee(res.data))
    }
  }, [params])

  const handleToggleModal = (e) => {
    e.preventDefault()
    setIsModalOpen((o) => !o)
  }

  const handleAdd = (e) => {
    e.preventDefault()
    console.log('Adding', e)
  }

  const handleEdit = (trainee) => console.log('Editing', trainee)

  const handleDelete = (trainee) => console.log('Deleting', trainee)

  return (
    <>
      <Modal
        open={isModalOpen}
        title={`${trainee?.badge} - ${trainee?.last_name}, ${trainee?.first_name}`}
        onClose={handleToggleModal}
      >
        <Training
          trainee={trainee}
          onAdd={handleAdd}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Modal>
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
              <Link to="/trainees">Trainees</Link>
            </li>
            <li>Trainee</li>
          </ul>
        </nav>
        <article className="form-container">
          <div className="form-container-header">
            <a
              href="/#"
              role="button"
              onClick={handleToggleModal}
              className="training-data-button"
            >
              Training
            </a>
          </div>
          <TraineeComponent trainee={trainee} />
        </article>
      </main>
    </>
  )
}

export default Trainee
