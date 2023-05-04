import { Tag } from '../../shared'
import fields from './trainee-fields.json'

const Row = ({ label, value }) => (
  <div className="row-line" key={label}>
    <span>{label}:</span>
    <span>{value}</span>
  </div>
)

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
        {fields.map((f) => (
          <Row key={f.label} label={f.label} value={trainee[f.field]} />
        ))}
      </div>
    </article>
  )
}
