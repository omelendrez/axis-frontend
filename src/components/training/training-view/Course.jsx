import { Loading, Buttons } from '../../shared'
import { Tracking } from './Tracking'
import fields from './course-fields.json'
import { TRAINING_STATUS } from '../../../helpers'

const Row = ({ label, value, className }) => (
  <div className="row-line" key={label}>
    <div>{label}:</div>
    <div className={className}>{value}</div>
  </div>
)

export const Course = ({ training, onEdit, onDelete, onUndo }) => {
  if (!training) {
    return <Loading />
  }

  const { status_id: status, tracking } = training

  const handleUndo = () => (status === TRAINING_STATUS.ADMIN ? null : onUndo)

  return (
    <article className="course">
      <h6 className="title">Course info</h6>
      <Buttons
        onEdit={onEdit}
        onDelete={onDelete}
        onUndo={handleUndo}
        noCheckboxes
      />
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

      <Tracking tracking={tracking} />
    </article>
  )
}
