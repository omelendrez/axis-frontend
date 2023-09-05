export const RadioButton = ({ label, value, checked, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div>
      <input
        type="radio"
        value={value}
        id="select-all"
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor="select-all">{label}</label>
    </div>
  )
}
