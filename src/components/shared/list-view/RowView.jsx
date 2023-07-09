import useUser from '@/hooks/useUser'
import { ActionButton } from '@/components'

export const RowView = ({ item, fields, onEdit, onDelete }) => {
  const { user } = useUser()
  let isLocked = false
  fields.forEach((f) => {
    const lock = f.lock
    if (lock) {
      if (lock.values.includes(item[f.name])) {
        isLocked = true
      }
    }
  })

  const handleDelete = (e) => {
    e.preventDefault()
    onDelete(item)
  }

  return (
    <tr>
      {fields.map((f) => {
        let style = {}

        if (f.noWrap) {
          style = { ...style, whiteSpace: 'nowrap' }
        }

        if (f.center) {
          style = { ...style, textAlign: 'center' }
        }

        if (f.right) {
          style = { ...style, textAlign: 'right' }
        }

        if (f.maxWidth) {
          style = {
            ...style,
            maxWidth: f.maxWidth
          }
        }

        if (f.ellipsis) {
          style = {
            ...style,
            maxWidth: f.maxWidth,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        }

        return (
          <td key={f.name} style={style}>
            {item[f.name]}
          </td>
        )
      })}

      <td className="action-cell">
        {onEdit && (
          <ActionButton
            label="edit"
            className="primary"
            tooltip="Click to Edit"
            disabled={user.role !== 1 || isLocked}
            onClick={() => onEdit(item)}
          />
        )}
        {onDelete && (
          <ActionButton
            label="remove_circle_outline"
            className="delete"
            tooltip="Click to Delete"
            disabled={user.role !== 1 || isLocked}
            onClick={handleDelete}
          />
        )}
      </td>
    </tr>
  )
}
