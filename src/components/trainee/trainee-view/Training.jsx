import { useState } from 'react'
import fields from './training-fields.json'
import { Buttons } from './Buttons'

const Row = ({ training, selected, onSelect }) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={training.id}
          checked={selected.find((s) => s === training.id)}
          onChange={onSelect}
        />
      </td>
      {fields.map((f) => (
        <td key={f.field}>{training[f.field]}</td>
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
      <figure>
        <table role="grid">
          <thead>
            <Headers />
          </thead>

          <tbody>
            {trainings.map((t) => (
              <Row
                key={t.id}
                training={t}
                selected={selected}
                onSelect={handleSelect}
              />
            ))}
            {!trainings.length && (
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
