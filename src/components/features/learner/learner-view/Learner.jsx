import { Buttons, Divider, Tag } from '@/components'

import fields from './learner-fields.json'
import './learner.css'
import './learner-card.css'

const Row = ({ label, value, className, isTag }) => (
  <div className="row-line" key={label}>
    {label && <div>{label}:</div>}
    {isTag ? (
      <Tag className={value}>{value}</Tag>
    ) : (
      <div className={className}>{value}</div>
    )}
  </div>
)

export const Learner = ({ learner, onView, onEdit, onDelete }) => {
  if (!learner) {
    return null
  }

  return (
    <article className="learner">
      <h6 className="title">Learner data</h6>
      <Buttons
        onEdit={onEdit}
        onView={onView}
        onDelete={onDelete}
        noCheckboxes
      />
      <Divider style={{ margin: '1rem 0' }} />
      <div>
        {fields
          .filter((f) => Boolean(learner[f.field]))
          .map((f) => (
            <Row
              key={f.label}
              label={f.label}
              value={learner[f.field]}
              isTag={f.field === 'type'}
              className={f.className}
            />
          ))}
      </div>
    </article>
  )
}
