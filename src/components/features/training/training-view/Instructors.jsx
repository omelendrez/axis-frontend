import { useEffect, useState } from 'react'
import fields from './instructor-fields.json'
import useConfirm from '@/hooks/useConfirm'

import { Table, Buttons, Confirm, Divider } from '@/components'

export const Instructors = ({ training, onAdd, onEdit, onDelete }) => {
  const { instructors } = training
  const [selected, setSelected] = useState([])

  const { isConfirmOpen, confirmMessage, setMessage, closeConfirm } =
    useConfirm()

  useEffect(() => {
    const filtered = selected.filter((s) => instructors.find((t) => t.id === s))
    setSelected(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instructors])

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
      const instructor = instructors.find(
        (t) => t.id === parseInt(selected[0], 10)
      )
      const message = (
        <span>
          Are you sure you want to delete{' '}
          <span className="primary">{instructor?.value}</span>?
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
    <article className="Instructors">
      <h6 className="title">Instructors' assignment</h6>

      <Buttons
        selected={selected}
        onAdd={onAdd}
        onEdit={onEdit ? handleEdit : null}
        onDelete={onDelete ? handleDelete : null}
      />
      <Divider style={{ margin: '1rem 0' }} />

      <Table
        items={instructors}
        fields={fields}
        selected={selected}
        onSelect={onAdd || onEdit || onDelete ? handleSelect : null}
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
