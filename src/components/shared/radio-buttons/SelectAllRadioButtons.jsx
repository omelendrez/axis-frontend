import { RADIO } from '@/helpers'
import { RadioButton } from './RadioButton'
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

export const SelectAllRadioButtons = ({ selected, onChange }) => (
  <div className="select-all-radio-buttons">
    {OPTIONS.map((o) => (
      <RadioButton
        key={o.value}
        label={o.label}
        value={o.value}
        checked={selected === o.value}
        onChange={onChange}
      />
    ))}
  </div>
)
