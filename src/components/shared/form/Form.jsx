import { CloseButton } from '@/components'
import { FormButtonRow, SaveButton, InputComponent } from '@/components'

export const Form = ({
  schema,
  object,
  isLoading,
  onChange,
  values,
  min,
  max,
  options,
  onSubmit,
  onClose
}) => (
  <form onSubmit={onSubmit}>
    {schema.map((field) => {
      if (
        field.if &&
        (!object?.hasOwnProperty(field.if) || !object[field.if])
      ) {
        return null
      }
      return (
        <InputComponent
          key={field.id}
          field={field}
          values={values}
          onChange={onChange}
          options={options}
          min={min}
          max={max}
        />
      )
    })}
    <FormButtonRow>
      <SaveButton isSubmitting={isLoading} />
      <CloseButton isSubmitting={isLoading} onClose={onClose} />
    </FormButtonRow>
  </form>
)
