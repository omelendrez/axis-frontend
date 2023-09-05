import { RADIO } from '@/helpers'
import './selectAllRadioButtons.css'

const OPTIONS = [
  {
    label: 'Select all',
    value: RADIO.ALL
  },
  {
    label: 'Select none',
    value: RADIO.NONE
  }
]

const RadioButton = ({ label, value, checked, onClick }) => {
  const handleChange = (e) => {
    onClick(e.target.value)
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
      <label for="select-all">{label}</label>
    </div>
  )
}

export const SelectAllRadioButtons = ({ selected, onClick }) => (
  <div className="select-all-radio-buttons">
    {OPTIONS.map((o) => (
      <RadioButton
        key={o.value}
        label={o.label}
        value={o.value}
        checked={selected === o.value}
        onClick={onClick}
      />
    ))}
  </div>
)
