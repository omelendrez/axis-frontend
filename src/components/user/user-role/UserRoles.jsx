import { useEffect, useState } from 'react'
import fields from './user-role-fields.json'
import { Table, Buttons } from '../../shared'

import useApiMessages from '../../../hooks/useApiMessages'
import { createUserRole } from '../../../services'

export const UserRoles = ({ items, course, onClose }) => {
  const { apiMessage } = useApiMessages()

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

    const payload = selected.map((i) => [course, parseInt(i, 10)])

    createUserRole([payload])
      .then((res) => {
        apiMessage(res)
        setSelected([])
        onClose()
      })
      .catch((e) => apiMessage(e))
  }

  return (
    <article className="course-view">
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
