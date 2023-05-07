const Row = ({ fields, item, selected, onSelect }) => {
  return (
    <tr>
      <td>
        <input
          type="checkbox"
          value={item.id}
          checked={selected.find((s) => s === item.id)}
          onChange={onSelect}
        />
      </td>
      {fields.map((f) => (
        <td key={f.field}>{item[f.field]}</td>
      ))}
    </tr>
  )
}

const Headers = ({ fields }) => (
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
export const Table = ({ items, fields, selected, onSelect }) => (
  <figure>
    <table role="grid">
      <thead>
        <Headers fields={fields} />
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
