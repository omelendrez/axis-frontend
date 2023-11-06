import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Modal } from '@/components'

import { Course, CourseItems, CourseModules } from './course-view'
import { CourseForm } from '../..'
import { CourseItemRels as CourseItemRelList } from './course-item-rel'
import { CourseModuleRels as CourseModuleRelList } from './course-module-rel'

import useApiMessages from '@/hooks/useApiMessages'

import courseItemFields from './course-view/course-item-fields.json'
import courseModuleFields from './course-view/course-module-fields.json'

import {
  getCourse,
  getCourseView,
  deleteCourse,
  getCourseItemsRel,
  getCourseAvailableItems,
  deleteCourseItemRel,
  getCourseModulesRel,
  getCourseAvailableModules,
  deleteCourseModuleRel
} from '@/services'

import './courseView.css'

export const CourseView = () => {
  const params = useParams()
  const navigate = useNavigate()

  const { apiMessage } = useApiMessages()

  const [update, setUpdate] = useState(false)

  const [course, setCourse] = useState(null)
  const [courseEditData, setCourseEditData] = useState(null)
  const [isCourseEdit, setIsCourseEdit] = useState(false)

  const [courseItems, setCourseItems] = useState([])
  const [courseItemEditData, setCourseItemEditData] = useState(null)
  const [courseItemsAvailable, setCourseItemsAvailable] = useState([])
  const [isCourseItemEdit, setIsCourseItemEdit] = useState(false)

  const [courseModules, setCourseModules] = useState([])
  const [courseModuleEditData, setCourseModuleEditData] = useState(null)
  const [courseModulesAvailable, setCourseModulesAvailable] = useState([])
  const [isCourseModuleEdit, setIsCourseModuleEdit] = useState(false)

  const id = params?.id

  // Course
  const handleEditCourse = (e) => {
    e?.preventDefault()
    getCourse(id)
      .then((res) => {
        setCourseEditData(res.data)
        setIsCourseEdit(true)
      })
      .catch((e) => apiMessage(e))
  }

  const handleDeleteCourse = (e) => {
    e.preventDefault()

    deleteCourse(id)
      .then((res) => {
        apiMessage(res)
        navigate('/courses')
      })
      .catch((e) => apiMessage(e))
  }

  // Course item
  const handleAddCourseItem = (e) => {
    e.preventDefault()

    const fields = courseItemFields.map((f) => f.field)

    const fieldData = {}
    fields.forEach((f) => (fieldData[f] = ''))

    setCourseItemEditData({ ...fieldData, course: id, id: undefined })
    setIsCourseItemEdit(true)
  }

  const handleDeleteCourseItem = (courseItemId) =>
    deleteCourseItemRel(courseItemId)
      .then((res) => {
        apiMessage(res)
        setUpdate((u) => !u)
      })
      .catch((e) => apiMessage(e))

  // Course module
  const handleAddCourseModule = (e) => {
    e.preventDefault()

    const fields = courseModuleFields.map((f) => f.field)

    const fieldData = {}
    fields.forEach((f) => (fieldData[f] = ''))

    setCourseModuleEditData({ ...fieldData, course: id, id: undefined })
    setIsCourseModuleEdit(true)
  }

  const handleDeleteCourseModule = (courseModuleId) =>
    deleteCourseModuleRel(courseModuleId)
      .then((res) => {
        apiMessage(res)
        setUpdate((u) => !u)
      })
      .catch((e) => apiMessage(e))

  const handleClose = (e) => {
    e?.preventDefault()

    setUpdate((u) => !u)

    if (isCourseItemEdit) {
      setCourseItemEditData(null)
      setIsCourseItemEdit(false)
    }

    if (isCourseModuleEdit) {
      setCourseModuleEditData(null)
      setIsCourseModuleEdit(false)
    }
    if (isCourseEdit) {
      setCourseEditData(null)
      setIsCourseEdit(false)
    }
  }

  useEffect(() => {
    if (id) {
      // Course
      getCourseView(id)
        .then((res) => setCourse(res.data))
        .catch((e) => apiMessage(e))

      // Course item
      getCourseItemsRel(id)
        .then((res) => setCourseItems(res.data))
        .catch((e) => apiMessage(e))

      getCourseAvailableItems(id)
        .then((res) => setCourseItemsAvailable(res.data))
        .catch((e) => apiMessage(e))

      // Course module
      getCourseModulesRel(id)
        .then((res) => setCourseModules(res.data))
        .catch((e) => apiMessage(e))

      getCourseAvailableModules(id)
        .then((res) => setCourseModulesAvailable(res.data))
        .catch((e) => apiMessage(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, update])

  if (!course) {
    return null
  }

  return (
    <>
      {/* Edit modals  */}

      <Modal open={isCourseEdit} title="Edit course" onClose={handleClose}>
        <CourseForm course={courseEditData} onClose={handleClose} />
      </Modal>

      {/* Items */}

      <Modal
        open={isCourseItemEdit}
        title="Insert course items"
        onClose={handleClose}
      >
        <CourseItemRelList
          id={course.id}
          items={courseItemsAvailable}
          key={courseItemEditData?.id}
          onClose={handleClose}
        />
      </Modal>

      {/* Modules */}

      <Modal
        open={isCourseModuleEdit}
        title="Insert course modules"
        onClose={handleClose}
      >
        <CourseModuleRelList
          id={course.id}
          items={courseModulesAvailable}
          key={courseModuleEditData?.id}
          onClose={handleClose}
        />
      </Modal>
      <main className="course-view">
        {/* Data components */}

        <Course
          course={course}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
        />

        <CourseModules
          items={courseModules}
          onAdd={handleAddCourseModule}
          onDelete={handleDeleteCourseModule}
          key={courseModuleEditData?.id}
        />

        <CourseItems
          items={courseItems}
          onAdd={handleAddCourseItem}
          onDelete={handleDeleteCourseItem}
          key={courseItemEditData?.id}
        />
      </main>
    </>
  )
}
