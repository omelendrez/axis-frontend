import { Tag } from '../../shared'
import { Buttons } from './Buttons'
import fields from './learner-fields.json'
import './learner.css'

const Row = ({ label, value, className }) => (
  <div className="row-line" key={label}>
    <span>{label}:</span>
    <span className={className}>{value}</span>
  </div>
)

export const Learner = ({ learner, onAdd, onEdit }) => {
  if (!learner) {
    return null
  }

  return (
    <article className="learner">
      <h6 className="title">Personal data</h6>
      <Buttons onAdd={onAdd} onEdit={onEdit} noCheckboxes />
      <div>
        <div className="row-line">
          <span>Type:</span>
          <span>
            <Tag className={learner.type}>{learner.type}</Tag>
          </span>
        </div>
        {fields.map((f) => (
          <Row
            key={f.label}
            label={f.label}
            value={learner[f.field]}
            className={f.className}
          />
        ))}
      </div>
    </article>
  )
}
