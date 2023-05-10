import { Dropdown, DropdownSearch, InputField } from '../input'

export const InputComponent = ({ field, values, options, onChange }) => {
  let component
  switch (field.type) {
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

    case 'text':
    case 'date':
      component = (
        <InputField
          type={field.type}
          id={field.id}
          label={field.label}
          placeholder={field.placeholder}
          value={values[field.id].value}
          onChange={onChange}
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

    default:
      break
  }
  return component
}
