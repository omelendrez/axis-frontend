import { InputField, Button } from '@/components/shared'
import './yearInput.css'

export const YearInput = ({ year, onChange, onLoadClick, disabled }) => (
  <div className="reporting-chart-input">
    <InputField
      type="number"
      id="year"
      label="Year"
      value={year}
      onChange={onChange}
    />
    <Button onClick={onLoadClick} disabled={disabled}>
      load
    </Button>
  </div>
)
