import { Tag } from '../../shared'

export const Trainee = ({ trainee }) => {
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
          <span>Badge:</span>
          <span>{trainee.badge}</span>
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
