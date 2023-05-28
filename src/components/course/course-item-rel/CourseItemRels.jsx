import { useEffect, useState } from 'react'
import fields from './course-item-rel-fields.json'
import { Table, Buttons } from '../../shared'

import useNoficication from '../../../hooks/useNotification'

import { createCourseItemRel } from '../../../services'

import { handleError } from '../../../reducers/error'

export const CourseItemRels = ({ items, course, onClose }) => {
  const [selected, setSelected] = useState([])

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

  const handleAddItems = (e) => {
    e.preventDefault()

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
      .catch((e) => handleError(e))
  }

  return (
    <article className="course-view">
      <h6 className="title">Available course items</h6>
      <Buttons selected={selected} onAdd={handleAddItems} noCheckboxes />
      <Table
        items={items}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
    </article>
  )
}
