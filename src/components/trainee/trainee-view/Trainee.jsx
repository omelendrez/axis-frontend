import { Tag } from '../../shared'
import { Buttons } from './Buttons'
import fields from './trainee-fields.json'
import './trainee.css'

const Row = ({ label, value, className }) => (
  <div className="row-line" key={label}>
    <span>{label}:</span>
    <span className={className}>{value}</span>
  </div>
)

export const Trainee = ({ trainee, onEdit }) => {
  if (!trainee) {
    return null
  }
  return (
    <article className="trainee">
      <h6 className="title">Personal data</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <div>
        <div className="row-line">
          <span>Type:</span>
          <span>
            <Tag className={trainee.type}>{trainee.type}</Tag>
          </span>
        </div>
        {fields.map((f) => (
          <Row
            key={f.label}
            label={f.label}
            value={trainee[f.field]}
            className={f.className}
          />
        ))}
      </div>
    </article>
  )
}
