export const Dropdown = ({ onChange, value, options }) =>
  <select id="status" onChange={onChange} value={value} required>
    {options.map((s) =>
      <option key={s.id} value={s.id}>
        {s.name}
      </option>
    )}
  </select>
