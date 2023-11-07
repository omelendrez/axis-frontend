import { Dropdown, DropdownSearch, InputField, Switch } from '@/components'

export const InputComponent = ({
  field,
  values,
  min,
  max,
  options,
  onChange
}) => {
  let component

  switch (field.type) {
    case 'text':
    case 'date':
    case 'email':
    case 'number':
      component = (
        <InputField
          type={field.type}
          id={field.id}
          label={field.label}
          placeholder={field.placeholder}
          value={values[field.id].value}
          onChange={onChange}
          required={field.required}
          readOnly={field.readOnly}
          min={min}
          max={max}
        />
      )
      break

    case 'dropdown':
      component = (
        <Dropdown
          id={field.id}
          label={field.label}
          onChange={onChange}
          value={values[field.id].value}
          options={options[field.options]}
          required={field.required}
        />
      )
      break

    case 'dropdown-search':
      component = (
        <DropdownSearch
          id={field.id}
          label={field.label}
          onChange={onChange}
          value={values[field.id].value}
          options={options[field.options]}
          required={field.required}
        />
      )
      break
    case 'switch':
      component = (
        <Switch
          id={field.id}
          label={field.label}
          onChange={onChange}
          value={values[field.id].value}
        />
      )
      break

    default:
      component = (
        <div>
          <span>Unknown input field type</span>
          <span>
            <code>
              <b>{field.type}</b>
            </code>
          </span>
        </div>
      )
      break
  }
  return component
}
