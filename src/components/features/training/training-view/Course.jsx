import { Buttons, Divider } from '@/components'
import fields from './course-fields.json'
import { TRAINING_STATUS } from '@/helpers'
import './course.css'

const Row = ({ label, value, className, divider }) => {
  return (
    <>
      <div className="row-line" key={label}>
        <div>{label}:</div>
        <div className={className}>{value}</div>
      </div>
      {divider && <Divider style={{ margin: '14px 0' }} />}
    </>
  )
}

export const Course = ({ training, onEdit, onDelete, onUndo, onAssign }) => {
  if (!training) {
    return null
  }

  const canEdit = training.status < TRAINING_STATUS.TRAINING_COORDINATOR_DONE

  return (
    <article className="course">
      <h6 className="title">Course info</h6>

      <Buttons
        onEdit={canEdit && onEdit}
        onDelete={onDelete}
        onUndo={onUndo}
        onAssign={onAssign}
        noCheckboxes
      />
      <Divider style={{ margin: '1rem 0' }} />

      {fields
        .filter((f) =>
          Boolean(f.model ? training[f.model][f.field] : training[f.field])
        )
        .map((f) => (
          <Row
            key={f.label}
            label={f.label}
            value={f.model ? training[f.model][f.field] : training[f.field]}
            className={`${f.className} ${
              f.model
                ? training[f.model][f.field].toLowerCase()
                : training[f.field].toLowerCase()
            }`}
            divider={f.divider}
          />
        ))}
    </article>
  )
}
