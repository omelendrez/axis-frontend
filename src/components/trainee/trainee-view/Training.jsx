import { useState } from 'react'
import fields from './training-fields.json'
import { Buttons } from './Buttons'
import { Table } from './Table'

export const Training = ({ trainings }) => {
  const [selected, setSelected] = useState([])

  const handleSelect = (e) => {
    const { checked, value } = e.target
    if (checked) {
      setSelected((selected) => [...selected, value])
    } else {
      setSelected((selected) => selected.filter((s) => s !== value))
    }
  }

  return (
    <article>
      <h6 className="title">Training records</h6>
      <Buttons selected={selected} />
      <Table
        items={trainings}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
    </article>
  )
}
