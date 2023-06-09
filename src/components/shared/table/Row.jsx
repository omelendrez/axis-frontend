export const Row = ({ fields, item, selected, onSelect }) => (
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
