import { useEffect, useState } from 'react'
import fields from './training-fields.json'
import { Table, Buttons, Divider } from '@/components'
// Ok

export const Trainings = ({ trainings, onAdd, onEdit, onDelete }) => {
  const [selected, setSelected] = useState([])

  useEffect(() => {
    const filtered = selected.filter((s) => trainings.find((t) => t.id === s))
    setSelected(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainings])

  const handleSelect = (e) => {
    const { checked, value } = e.target
    setSelected((selected) =>
      checked ? [...selected, value] : selected.filter((s) => s !== value)
    )
  }

  const handleEdit = (e) => {
    e.preventDefault()
    if (selected.length) {
      onEdit(selected[0])
    }
  }

  const handleDelete = () => {
    if (selected.length) {
      onDelete(selected[0])
    }
  }

  return (
    <article>
      <h6 className="title">Training records</h6>
      <Buttons
        selected={selected}
        onAdd={onAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Divider style={{ margin: '1rem 0' }} />

      <Table
        items={trainings}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
    </article>
  )
}
