import { Buttons } from '@/components'

import fields from './user-fields.json'
import './user.css'

const Row = ({ label, value, className }) => (
  <div className="row-line" key={label}>
    <div>{label}:</div>
    <div className={className}>{value}</div>
  </div>
)

export const User = ({ user, onEdit, onDelete }) => {
  if (!user) {
    return null
  }

  const roles = JSON.parse(user.roles).map((r) => r.name)

  return (
    <article className="user">
      <h6 className="title">User data</h6>
      <Buttons onEdit={onEdit} onDelete={onDelete} noCheckboxes />
      <div>
        {fields.map(
          (f) =>
            user[f.field].length > 0 && (
              <Row
                key={f.label}
                label={f.label}
                value={user[f.field]}
                className={f.className}
              />
            )
        )}
        <Row
          key={'Roles'}
          label={'Roles'}
          value={roles.join(', ') || 'No role assigned'}
          className={'roles'}
        />
      </div>
    </article>
  )
}
