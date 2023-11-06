import { useEffect, useState } from 'react'
import fields from './course-module-fields.json'
import { Table, Buttons, Confirm, Divider } from '@/components'
import useConfirm from '@/hooks/useConfirm'

export const CourseModules = ({ items, onAdd, onDelete }) => {
  const [selected, setSelected] = useState([])

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
      const module = items.find((t) => t.id === parseInt(selected[0], 10))
      const message = (
        <span>
          Are you sure you want to delete{' '}
          <span className="primary">{module?.name}</span>?
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
      <h6 className="title">Course Module records</h6>
      <Buttons selected={selected} onAdd={onAdd} onDelete={handleDelete} />
      <Divider style={{ margin: '1rem 0' }} />

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
