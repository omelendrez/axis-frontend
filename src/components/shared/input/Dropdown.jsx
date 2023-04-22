export const Dropdown = ({ id, label, onChange, value, options }) => (
  <div className={`form-control ${value.error ? 'error' : ''}`}>
    <label htmlFor={id}>{label}</label>
    <select id={id} onChange={onChange} required value={value}>
      <option value="" disabled>
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
)
