import { useEffect, useState } from 'react'
import fields from './course-item-fields.json'
import { Table, Buttons } from '@/components'
// Ok

export const CourseItems = ({ items, onAdd, onDelete }) => {
  const [selected, setSelected] = useState([])

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

  const handleDelete = () => {
    if (selected.length) {
      onDelete(selected[0])
    }
  }

  return (
    <article>
      <h6 className="title">Course Item records</h6>
      <Buttons selected={selected} onAdd={onAdd} onDelete={handleDelete} />
      <Table
        items={items}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
    </article>
  )
}
