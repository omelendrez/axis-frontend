import { useState } from 'react'
import fields from './contact-fields.json'
import { Buttons } from './Buttons'
import { Table } from '../../shared/table/Table'

export const Contacts = ({ contacts, onEdit, onDelete }) => {
  const [selected, setSelected] = useState([])

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

  const handleDelete = () => {
    if (selected.length) {
      onDelete(selected[0])
    }
  }

  return (
    <article>
      <h6 className="title">Contact info</h6>
      <Buttons
        selected={selected}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <Table
        items={contacts}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
    </article>
  )
}
