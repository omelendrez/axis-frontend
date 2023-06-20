import fields from './course-item-rel-fields.json'
import { Multiselect } from '@/components'

import { createCourseItemRel } from '@/services'

export const CourseItemRels = ({ id, items, key, onClose }) => {
  return (
    <Multiselect
      fields={fields}
      id={id}
      items={items}
      key={key}
      onClose={onClose}
      onSave={createCourseItemRel}
    />
  )
}
