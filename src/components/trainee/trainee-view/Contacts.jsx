import { useState } from 'react'
import fields from './contact-fields.json'
import { Buttons } from './Buttons'
import { Table } from '../../shared/table/Table'

export const Contacts = ({ contactInfos }) => {
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
      <h6 className="title">Contact info</h6>
      <Buttons selected={selected} />
      <Table
        items={contactInfos}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
    </article>
  )
}
