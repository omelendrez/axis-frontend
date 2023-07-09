import { useEffect, useState } from 'react'
import fields from './user-role-fields.json'
import { Table, Buttons, Confirm } from '@/components'
import useDeleteConfirm from '@/hooks/useDeleteConfirm'
// Ok

export const UserRoles = ({ items, onAdd, onDelete }) => {
  const [selected, setSelected] = useState([])

  const { isConfirmOpen, confirmMessage, setMessage, closeConfirm } =
    useDeleteConfirm()

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
      const message = (
        <span>
          Are you sure you want to delete{' '}
          <span className="primary">{item?.name}</span>?
        </span>
      )

      setMessage(message)
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
      <h6 className="title">User role records</h6>
      <Buttons
        selected={selected}
        onAdd={onAdd}
        onDelete={items.length > 1 ? handleDelete : null}
      />
      <Table
        items={items}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
      <Confirm
        open={isConfirmOpen}
        onCofirm={handleDeleteConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />
    </article>
  )
}
