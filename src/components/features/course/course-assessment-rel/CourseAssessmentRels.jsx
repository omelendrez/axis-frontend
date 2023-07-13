import fields from './course-assessment-rel-fields.json'
import { Multiselect } from '@/components'

import { createCourseAssessmentRel } from '@/services'

export const CourseAssessmentRels = ({ id, items, key, onClose }) => {
  return (
    <Multiselect
      fields={fields}
      id={id}
      items={items}
      key={key}
      onClose={onClose}
      onSave={createCourseAssessmentRel}
    />
  )
}
