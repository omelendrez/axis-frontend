import { useEffect, useState } from 'react'
import fields from './user-role-fields.json'
import { Table, Buttons } from '../../shared'

import useApiMessages from '../../../hooks/useApiMessages'
import useNoficication from '../../../hooks/useNotification'
import { createUserRole } from '../../../services'

export const UserRoles = ({ items, user, onClose }) => {
  const { apiMessage } = useApiMessages()

  const { set } = useNoficication()

  const [selected, setSelected] = useState([])

  useEffect(() => {
    const filtered = selected.filter((s) => items.find((t) => t.id === s))
    setSelected(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  const handleSelect = (e) => {
    const { checked, value } = e.target
    setSelected((selected) =>
      checked ? [...selected, value] : selected.filter((s) => s !== value)
    )
  }

  const handleSaveRoles = (e) => {
    e.preventDefault()

    if (!selected.length) {
      const notification = {
        type: 'error',
        message: 'No items selected'
      }
      return set(notification)
    }

    const payload = selected.map((i) => [user, parseInt(i, 10)])

    createUserRole([payload])
      .then((res) => {
        apiMessage(res)
        setSelected([])
        onClose()
      })
      .catch((e) => apiMessage(e))
  }

  return (
    <article className="user-view">
      <h6 className="title">Available user roles</h6>
      <Buttons selected={selected} onSave={handleSaveRoles} noCheckboxes />
      <Table
        items={items}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
    </article>
  )
}
