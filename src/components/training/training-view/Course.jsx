import { Loading, Buttons } from '../../shared'
import fields from './course-fields.json'

const Row = ({ label, value, className }) => (
  <div className="row-line" key={label}>
    <div>{label}:</div>
    <div className={className}>{value}</div>
  </div>
)

export const Course = ({ training, onEdit, onDelete }) => {
  if (!training) {
    return <Loading />
  }

  return (
    <article className="course">
      <h6 className="title">Course info</h6>
      <Buttons onEdit={onEdit} onDelete={onDelete} noCheckboxes />
      <div>
        {fields
          .filter((f) => Boolean(training[f.field]))
          .map((f) => (
            <Row
              key={f.label}
              label={f.label}
              value={training[f.field]}
              className={f.className}
            />
          ))}
      </div>
    </article>
  )
}
