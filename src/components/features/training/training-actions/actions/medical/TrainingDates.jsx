import { invertDateFormat } from '@/helpers'
import { InputField } from './InputField'

export const TrainingDates = ({ dates, onChange, canEdit }) => (
  <div className="date-list">
    {dates.map((d) => (
      <div key={d.date}>
        <div className="date-value">{invertDateFormat(d.date)}</div>
        <InputField
          id="systolic"
          data={d}
          onChange={onChange}
          canEdit={canEdit}
        />

        <InputField
          id="diastolic"
          data={d}
          onChange={onChange}
          canEdit={canEdit}
        />
      </div>
    ))}
  </div>
)
