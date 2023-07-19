export const Switch = ({ id, label, onChange, value }) => (
  <div
    className="form-control"
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '1rem',
      padding: '1rem',
      border: 'none',
      backgroundColor: 'white',

      borderRadius: 6
    }}
  >
    <label htmlFor={id}>{label}</label>
    <input
      type="checkbox"
      id={id}
      role="switch"
      onChange={onChange}
      style={{
        fontSize: '1.3rem'
      }}
      checked={value === 1}
    />
  </div>
)
