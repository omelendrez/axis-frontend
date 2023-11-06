import fields from './course-module-rel-fields.json'
import { Multiselect } from '@/components'

import { createCourseModuleRel } from '@/services'

export const CourseModuleRels = ({ id, items, key, onClose }) => (
  <Multiselect
    fields={fields}
    id={id}
    items={items}
    key={key}
    onClose={onClose}
    onSave={createCourseModuleRel}
  />
)
