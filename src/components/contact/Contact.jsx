import { useEffect, useState } from 'react'

import {
  InputField,
  FormButtonRow,
  SaveButton,
  DropdownSearch,
  CloseButton
} from '../shared'

import useContacts from '../../hooks/useContacts'
import useContactTypes from '../../hooks/useContactTypes'
import useNoficication from '../../hooks/useNotification'

import initialValues from './contact-fields.json'

export const Contact = ({ contact, onClose }) => {
  const { set } = useNoficication()

  const { contacts, add, modify } = useContacts()
  const { isLoading, isSuccess } = contacts

  const { contactTypes, load: loadTypes } = useContactTypes()
  const { data: typesList } = contactTypes

  const [values, setValues] = useState(initialValues)

  useEffect(() => {
    if (contact) {
      Object.entries(contact).forEach(([id, value]) => {
        const data = { value, error: '' }
        setValues((values) => ({ ...values, [id]: data }))
      })
    }
  }, [contact])

  useEffect(() => {
    if (isSuccess) {
      const notification = {
        type: 'success',
        message: 'Record updated successfully'
      }
      set(notification)
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    loadTypes()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (e) => {
    const { id, value } = e.target
    const data = { value, error: '' }
    setValues((values) => ({ ...values, [id]: data }))
  }

  const handleSave = (e) => {
    e.preventDefault()

    const payload = Object.entries(values)
      .filter((id) => id !== 'id')
      .reduce((acc, [id, value]) => ({ ...acc, [id]: value.value }), {})

    if (contact?.id) {
      modify(contact.id, payload)
    } else {
      add(payload)
    }
  }

  return (
    <form>
      <DropdownSearch
        id="type"
        label="Types"
        value={values.type.value}
        onChange={handleChange}
        options={typesList.rows}
        required
      />

      <InputField
        type="text"
        id="value"
        label="Info"
        placeholder="Enter contact info"
        value={values.value.value}
        onChange={handleChange}
        required
      />

      <FormButtonRow>
        <SaveButton isSubmitting={isLoading} onSave={handleSave} />

        <CloseButton isSubmitting={isLoading} onClose={onClose} />
      </FormButtonRow>
    </form>
  )
}