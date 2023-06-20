import { useEffect, useState } from 'react'
import fields from './contact-fields.json'

import { Table, Buttons } from '@/components'

export const Contacts = ({ contacts, onAdd, onEdit, onDelete }) => {
  const [selected, setSelected] = useState([])

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
        onAdd={onAdd}
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
