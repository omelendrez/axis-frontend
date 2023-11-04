export const Headers = ({ fields, onSelect }) => (
  <tr>
    {onSelect && (
      <th>
        <span className="material-icons">check</span>
      </th>
    )}{' '}
    {fields.map((f) => (
      <th key={f.field} scope="col">
        {f.label}
      </th>
    ))}
  </tr>
)
