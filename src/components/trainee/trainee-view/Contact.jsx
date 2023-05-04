import { useState } from 'react'
import fields from './contact-fields.json'
import { Buttons } from './Buttons'

const Row = ({ contact, selected, onSelect }) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={contact.id}
          checked={selected.find((s) => s === contact.id)}
          onChange={onSelect}
        />
      </td>
      {fields.map((f) => (
        <td key={f.field}>{contact[f.field]}</td>
      ))}
    </tr>
  )
}

const Headers = () => (
  <tr>
    <th>
      <span className="material-icons">check</span>
    </th>
    {fields.map((f) => (
      <th key={f.field} scope="col">
        {f.label}
      </th>
    ))}
  </tr>
)

export const Contact = ({ contactInfos }) => {
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
      <figure>
        <table role="grid">
          <thead>
            <Headers />
          </thead>

          <tbody>
            {contactInfos.map((t) => (
              <Row
                key={t.id}
                contact={t}
                selected={selected}
                onSelect={handleSelect}
              />
            ))}
            {!contactInfos.length && (
              <tr>
                <td colSpan={fields.length + 1}>
                  <center>No records found</center>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </figure>
    </article>
  )
}
