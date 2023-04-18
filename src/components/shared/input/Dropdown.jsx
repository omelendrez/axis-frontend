export const Dropdown = ({ id, onChange, value, options }) => (
  <select id={id} onChange={onChange} value={value} required>
    {options.map((s) => (
      <option key={s.id} value={s.id}>
        {s.name}
      </option>
    ))}
  </select>
);
