import { useState } from 'react'
import fields from './training-fields.json'
import { Buttons } from './Buttons'
import { Table } from '../../shared'
// Ok

export const Trainings = ({ trainings, onEdit, onDelete }) => {
  const [selected, setSelected] = useState([])

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
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Table
        items={trainings}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
    </article>
  )
}
