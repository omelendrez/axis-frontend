import { InputField, Button } from '@/components/shared'
import './yearInput.css'

export const YearInput = ({
  year,
  onChange,
  onLoadClick,
  disabled,
  isLoading
}) => (
  <div className="reporting-chart-input">
    <InputField
      type="number"
      id="year"
      label="Year"
      value={year}
      onChange={onChange}
      hideLabel
    />
    <Button onClick={onLoadClick} disabled={disabled} isLoading={isLoading}>
      load
    </Button>
  </div>
)
