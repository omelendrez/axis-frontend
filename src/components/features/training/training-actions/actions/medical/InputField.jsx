export const InputField = ({ id, data, onChange, canEdit }) => (
  <input
    id={id}
    type="number"
    placeholder={`${id.charAt(0).toUpperCase()}${id.slice(1)}`}
    onChange={onChange}
    value={data[id]}
    className="bp"
    readOnly={!canEdit || data.existing}
    data-date={data.date}
  />
)
