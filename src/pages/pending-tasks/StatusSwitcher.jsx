export const StatusSwitcher = ({ id, label, value, onChange }) => (
  <div className="pending-tasks-status-switch" key={id}>
    <input
      type="checkbox"
      id={id}
      role="switch"
      onChange={onChange}
      checked={value === 1}
    />
    <label htmlFor={id}>{label}</label>
  </div>
)
