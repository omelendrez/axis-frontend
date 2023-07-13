import { useEffect, useState } from 'react'
import fields from './contact-fields.json'
import useDeleteConfirm from '@/hooks/useDeleteConfirm'

import { Table, Buttons, Confirm, Divider } from '@/components'

export const Contacts = ({ contacts, onAdd, onEdit, onDelete }) => {
  const [selected, setSelected] = useState([])

  const { isConfirmOpen, confirmMessage, setMessage, closeConfirm } =
    useDeleteConfirm()

  useEffect(() => {
    const filtered = selected.filter((s) => contacts.find((t) => t.id === s))
    setSelected(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts])

  const handleSelect = (e) => {
    const { checked, value } = e.target
    if (checked) {
      setSelected((selected) => [...selected, value])
    } else {
      setSelected((selected) => selected.filter((s) => s !== value))
    }
  }

  const handleEdit = (e) => {
    e.preventDefault()
    if (selected.length) {
      onEdit(selected[0])
    }
  }

  const handleDelete = (e) => {
    e.preventDefault()

    if (selected.length) {
      const item = contacts.find((t) => t.id === parseInt(selected[0], 10))
      const message = (
        <span>
          Are you sure you want to delete{' '}
          <span className="primary">{item?.value}</span>?
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
      <h6 className="title">Contact info</h6>
      <Buttons
        selected={selected}
        onAdd={onAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Divider style={{ margin: '1rem 0' }} />

      <Table
        items={contacts}
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
