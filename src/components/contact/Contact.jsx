import { useEffect, useState } from 'react'

import { Form } from '../shared'

import useContacts from '@/hooks/useContacts'
import useContactTypes from '@/hooks/useContactTypes'
import useNoficication from '@/hooks/useNotification'

import schema from './schema.json'
import { loadSchema } from '@/helpers'

export const Contact = ({ contact, onClose }) => {
  const { set } = useNoficication()

  const { contacts, add, modify } = useContacts()
  const { isLoading, isSuccess } = contacts

  const { contactTypes, load: loadTypes } = useContactTypes()
  const { data: typesList } = contactTypes

  const initialValues = loadSchema(schema)

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

  const options = {
    typesList
  }

  return (
    <Form
      schema={schema}
      object={contact}
      isLoading={isLoading}
      onChange={handleChange}
      values={values}
      onSave={handleSave}
      onClose={onClose}
      options={options}
    />
  )
}
