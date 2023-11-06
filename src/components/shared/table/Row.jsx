export const Row = ({ fields, item, selected, onSelect }) => (
  <tr>
    {onSelect ? (
      <td>
        <input
          name="checkbox"
          type="checkbox"
          value={item.id}
          checked={selected.find((s) => s === item.id)}
          onChange={onSelect}
        />
      </td>
    ) : null}
    {fields.map((f) => (
      <td key={f.field}>{item[f.field]}</td>
    ))}
  </tr>
)
