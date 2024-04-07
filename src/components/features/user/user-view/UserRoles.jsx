import { useEffect, useState } from 'react'
import fields from './user-role-fields.json'
import { Table, Buttons, Confirm, Divider } from '@/components'
import useConfirm from '@/hooks/useConfirm'
import useNotification from '@/hooks/useNotification'
// Ok

export const UserRoles = ({ items, onAdd, onDelete }) => {
  const [selected, setSelected] = useState([])

  const { set } = useNotification()

  const { isConfirmOpen, confirmMessage, setMessage, closeConfirm } =
    useConfirm()

  useEffect(() => {
    const filtered = selected.filter((s) => items.find((t) => t.id === s))
    setSelected(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  const handleSelect = (e) => {
    const { checked, value } = e.target
    setSelected((selected) =>
      checked ? [...selected, value] : selected.filter((s) => s !== value)
    )
  }

  const handleDelete = (e) => {
    e.preventDefault()

    if (selected.length) {
      const item = items.find((t) => t.id === parseInt(selected[0], 10))
      if (item.name === 'System Admin') {
        const notification = {
          type: 'error',
          message: `${item.name} role cannot be removed`
        }
        set(notification)
      } else {
        const message = (
          <span>
            Are you sure you want to remove
            <span className="primary"> {item?.name}</span> role from this users'
            permissions?
          </span>
        )
        setMessage(message)
      }
    }
  }

  const handleDeleteConfirm = (e) => {
    e.preventDefault()

    onDelete(selected[0])

    closeConfirm()
  }

  const handleCancel = (e) => {
    e.preventDefault()

    closeConfirm()
  }

  return (
    <article>
      <h6 className="title">User roles assigned</h6>
      <Buttons
        selected={selected}
        onAdd={onAdd}
        onDelete={items.length > 1 ? handleDelete : null}
      />
      <Divider style={{ margin: '1rem 0' }} />

      <Table
        items={items}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
      <Confirm
        open={isConfirmOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />
    </article>
  )
}
