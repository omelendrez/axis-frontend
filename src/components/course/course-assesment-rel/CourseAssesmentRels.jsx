import fields from './course-assesment-rel-fields.json'
import { Multiselect } from '../../shared'

import { createCourseAssesmentRel } from '../../../services'

export const CourseAssesmentRels = ({ id, items, key, onClose }) => {
  return (
    <Multiselect
      fields={fields}
      id={id}
      items={items}
      key={key}
      onClose={onClose}
      onSave={createCourseAssesmentRel}
    />
  )
}
