import { useEffect, useState } from 'react'
import fields from './course-item-rel-fields.json'
import { Table, Buttons } from '../../shared'

import useNoficication from '../../../hooks/useNotification'

import { createCourseItemRel } from '../../../services'

import useApiMessages from '../../../hooks/useApiMessages'

export const CourseItemRels = ({ items, course, onClose }) => {
  const [selected, setSelected] = useState([])

  const { apiMessage } = useApiMessages()

  const { set } = useNoficication()

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

  const handleSaveItems = (e) => {
    e.preventDefault()

    if (!selected.length) {
      const notification = {
        type: 'error',
        message: 'No items selected'
      }
      return set(notification)
    }

    const payload = selected.map((i) => [course, parseInt(i, 10)])

    createCourseItemRel([payload])
      .then(() => {
        setSelected([])

        const notification = {
          type: 'success',
          message: 'Items inserted successfully'
        }

        set(notification)

        onClose()
      })
      .catch((e) => apiMessage(e))
  }

  return (
    <article className="course-view">
      <h6 className="title">Available course items</h6>
      <Buttons selected={selected} onSave={handleSaveItems} noCheckboxes />
      <Table
        items={items}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
    </article>
  )
}
