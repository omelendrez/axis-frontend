import { Loading, Tag } from '../../shared'
import { Buttons } from './Buttons'
import fields from './learner-fields.json'
import './learner.css'
import './learner-card.css'

const Row = ({ label, value, className }) => (
  <div className="row-line" key={label}>
    <div>{label}:</div>
    <div className={className}>{value}</div>
  </div>
)

export const Learner = ({ learner, onEdit }) => {
  if (!learner) {
    return <Loading />
  }

  return (
    <article className="learner">
      <h6 className="title">Personal data</h6>
      <Buttons onEdit={onEdit} noCheckboxes />
      <div>
        <div className="row-line">
          <div>Type:</div>
          <div>
            <Tag className={learner.type}>{learner.type}</Tag>
          </div>
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
