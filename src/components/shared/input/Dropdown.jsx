export const Dropdown = ({ id, label, onChange, value, options }) => (
  <div className={`form-control ${value.error ? "error" : ""}`}>
    <label htmlFor={id}>{label}</label>
    <select id={id} onChange={onChange} value={value} required>
      <option value="" disabled selected>
        Choose a {id}
      </option>
      {options.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
    <small>{value.error}</small>
  </div>
);
