import { Loading, Tag, Buttons } from '@/components'

import fields from './course-fields.json'
import './course.css'
import './course-card.css'

const Row = ({ label, value, className }) => (
  <div className="row-line" key={label}>
    <div>{label}:</div>
    <div className={className}>{value}</div>
  </div>
)

export const Course = ({ course, onEdit, onDelete }) => {
  if (!course) {
    return <Loading />
  }

  return (
    <article className="course">
      <h6 className="title">Course data</h6>
      <Buttons onEdit={onEdit} onDelete={onDelete} noCheckboxes />
      <div>
        <div className="row-line">
          <div>Type:</div>
          <div>
            <Tag className={course.type}>{course.type}</Tag>
          </div>
        </div>
        {fields.map(
          (f) =>
            !!course[f.field] && (
              <Row
                key={f.label}
                label={f.label}
                value={`${course[f.field]} ${f.postfix ? f.postfix : ''}`}
                className={f.className}
              />
            )
        )}
      </div>
    </article>
  )
}
