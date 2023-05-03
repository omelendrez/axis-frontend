import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getContactInfos,
  getPhoto,
  getTraineeView,
  getTrainings
} from '../../services'
import { Divider, Loading, Tag } from '../shared'
import './traineeForm.css'

const Picture = ({ photoUrl }) => {
  const handleImageError = (e) =>
    (e.target.src = '/public/assets/no-image-icon.png')

  return (
    <article className="picture">
      <h6 className="title">Profile picture</h6>
      <img src={photoUrl} alt={photoUrl} onError={handleImageError} />
    </article>
  )
}

const Form = ({ trainee }) => {
  if (!trainee) {
    return null
  }
  return (
    <article className="trainee">
      <h6 className="title">Personal data</h6>
      <div>
        <div className="row-line">
          <span>Type:</span>
          <span>
            <Tag className={trainee.type}>{trainee.type}</Tag>
          </span>
        </div>
        <div className="row-line">
          <span>Name:</span>
          <span>{trainee.full_name}</span>
        </div>
        <div className="row-line">
          <span>Birth date:</span>
          <span>{trainee.birth_date}</span>
        </div>
        <div className="row-line">
          <span>Sex: </span>
          <span>{trainee.sex}</span>
        </div>
        <div className="row-line">
          <span>State:</span>
          <span>{trainee.state}</span>
        </div>
        <div className="row-line">
          <span>Nationality:</span>
          <span>{trainee.nationality}</span>
        </div>
        <div className="row-line">
          <span>Status:</span>
          <span>{trainee.status}</span>
        </div>
      </div>
    </article>
  )
}

const Training = ({ trainings }) => {
  return (
    <article className="training">
      <h6 className="title">Training records</h6>
      <div>
        {trainings.map((t) => (
          <div>
            <div className="row-line">
              <span>Course: </span>
              <span>{t.course}</span>
            </div>
            <div className="row-line">
              <span>Start: </span>
              <span>{t.start}</span>
            </div>
            <div className="row-line">
              <span>Expiry: </span>
              <span>{t.expiry}</span>
            </div>
            <div className="row-line">
              <span>Certificate: </span>
              <span>{t.certificate}</span>
            </div>
            <div className="row-line">
              <span>Status: </span>
              <span>{t.status}</span>
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </article>
  )
}

const Contact = ({ contactInfos }) => {
  return (
    <article className="contact">
      <h6 className="title">Contact info</h6>
      <div>
        {contactInfos.map((ci) => (
          <div className="row-line" key={ci.type}>
            <span>{`${ci.type}`}:</span>
            <span>{`${ci.value}`}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

export const TraineeForm = () => {
  const params = useParams()
  const [trainee, setTrainee] = useState(null)
  const [contactInfos, setContactInfos] = useState([])
  const [trainings, setTrainings] = useState([])

  useEffect(() => {
    const id = params.id
    if (id) {
      getTraineeView(id).then((res) => setTrainee(res.data))
    }
  }, [params])

  useEffect(() => {
    const id = trainee?.id
    if (id) {
      getContactInfos(id).then((res) => setContactInfos(res.data))
    }
  }, [trainee])

  useEffect(() => {
    const id = trainee?.id
    if (id) {
      getTrainings(id).then((res) => setTrainings(res.data))
    }
  }, [trainee])

  if (!trainee) {
    return <Loading />
  }
  const photoUrl = getPhoto(trainee.badge)

  return (
    <main className="trainee-form">
      <div>
        <Picture photoUrl={photoUrl} />
        <Form trainee={trainee} />
      </div>
      <div>
        <Contact contactInfos={contactInfos} />
        <Training trainings={trainings} />
      </div>
    </main>
  )
}
