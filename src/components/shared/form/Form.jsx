import { CloseButton } from '@/components'
import { FormButtonRow, SaveButton, InputComponent } from '@/components'

export const Form = ({
  schema,
  object,
  isLoading,
  onChange,
  values,
  options,
  onSave,
  onClose
}) => (
  <form>
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
        />
      )
    })}
    <FormButtonRow>
      <SaveButton isSubmitting={isLoading} onSave={onSave} />
      <CloseButton isSubmitting={isLoading} onClose={onClose} />
    </FormButtonRow>
  </form>
)
