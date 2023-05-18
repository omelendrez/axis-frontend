export const ReadOnly = (props) => {
  const { id, label, value } = props
  const inputProps = { ...props, value: value || '' }
  return (
    <div className="form-control">
      <label htmlFor={id}>{label}</label>
      <input {...inputProps} autoCorrect="off" readOnly />
    </div>
  )
}
