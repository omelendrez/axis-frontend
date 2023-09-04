import { RADIO } from '@/helpers'
import './selectAllRadioButtons.css'

export const SelectAllRadioButtons = ({ selected, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className="select-all-radio-buttons">
      <div key="1">
        <input
          type="radio"
          value={RADIO.ALL}
          id="select-all"
          checked={selected === RADIO.ALL}
          onChange={handleChange}
        />
        <label for="select-all">Select all</label>
      </div>
      <div key="2">
        <input
          type="radio"
          value={RADIO.NONE}
          id="select-none"
          checked={selected === RADIO.NONE}
          onChange={handleChange}
        />
        <label for="select-all">Select none</label>
      </div>
    </div>
  )
}
