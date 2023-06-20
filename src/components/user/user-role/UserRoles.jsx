import fields from './user-role-fields.json'
import { Multiselect } from '../../shared'
import { createUserRole } from '@/services'

export const UserRoles = ({ items, id, key, onClose }) => {
  return (
    <Multiselect
      fields={fields}
      id={id}
      items={items}
      key={key}
      onClose={onClose}
      onSave={createUserRole}
    />
  )
}
