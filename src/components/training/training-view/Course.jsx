import { Loading, Buttons, Divider } from '../../shared'
import { Tracking } from './Tracking'
import fields from './course-fields.json'

const Row = ({ label, value, className, divider }) => (
  <>
    <div className="row-line" key={label}>
      <div>{label}:</div>
      <div className={className}>{value}</div>
    </div>
    {divider && <Divider style={{ margin: '14px 0' }} />}
  </>
)

export const Course = ({ training, onEdit, onDelete, onUndo }) => {
  if (!training) {
    return <Loading />
  }

  const { tracking } = training

  return (
    <article className="course">
      <h6 className="title">Course info</h6>
      <Buttons
        onEdit={onEdit}
        onDelete={onDelete}
        onUndo={onUndo}
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
              divider={f.divider}
            />
          ))}
      </div>

      <Tracking tracking={tracking} />
    </article>
  )
}
