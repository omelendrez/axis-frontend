import { Headers, Row } from './'

import './table.css'

export const Table = ({ items, fields, selected, onSelect }) => (
  <figure>
    <table role="grid">
      <thead>
        <Headers fields={fields} onSelect={onSelect} />
      </thead>

      <tbody>
        {items.map((t) => (
          <Row
            key={t.id}
            item={t}
            selected={selected}
            onSelect={onSelect}
            fields={fields}
          />
        ))}
        {!items.length && (
          <tr>
            <td colSpan={fields.length + 1}>
              <center>No records found</center>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </figure>
)
