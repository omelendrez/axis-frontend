import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Modal } from '@/components'

import { Course, CourseItems, CourseAssessments } from './course-view'
import { CourseForm } from '../..'
import { CourseItemRels as CourseItemRelList } from './course-item-rel'
import { CourseAssessmentRels as CourseAssessmentRelList } from './course-assessment-rel'

import useApiMessages from '@/hooks/useApiMessages'

import courseItemFields from './course-view/course-item-fields.json'
import courseAssessmentFields from './course-view/course-assessment-fields.json'

import {
  deleteCourse,
  deleteCourseAssessmentRel,
  deleteCourseItemRel,
  getCourse,
  getCourseAssessmentsRel,
  getCourseAvailableAssessments,
  getCourseAvailableItems,
  getCourseItemsRel,
  getCourseView
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

  const [courseAssessments, setCourseAssessments] = useState([])
  const [courseAssessmentEditData, setCourseAssessmentEditData] = useState(null)
  const [courseAssessmentsAvailable, setCourseAssessmentsAvailable] = useState(
    []
  )
  const [isCourseAssessmentEdit, setIsCourseAssessmentEdit] = useState(false)

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

  // Course assessment
  const handleAddCourseAssessment = (e) => {
    e.preventDefault()

    const fields = courseAssessmentFields.map((f) => f.field)

    const fieldData = {}
    fields.forEach((f) => (fieldData[f] = ''))

    setCourseAssessmentEditData({ ...fieldData, course: id, id: undefined })
    setIsCourseAssessmentEdit(true)
  }

  const handleDeleteCourseAssessment = (courseAssessmentId) =>
    deleteCourseAssessmentRel(courseAssessmentId)
      .then((res) => {
        apiMessage(res)
        setUpdate((u) => !u)
      })
      .catch((e) => apiMessage(e))

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

  const handleClose = (e) => {
    e?.preventDefault()

    setUpdate((u) => !u)

    if (isCourseAssessmentEdit) {
      setCourseAssessmentEditData(null)
      setIsCourseAssessmentEdit(false)
    }
    if (isCourseItemEdit) {
      setCourseItemEditData(null)
      setIsCourseItemEdit(false)
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
        .then((res) => {
          setCourse(res.data)
        })
        .catch((e) => apiMessage(e))

      // Course assessment
      getCourseAssessmentsRel(id)
        .then((res) => {
          setCourseAssessments(res.data)
        })
        .catch((e) => apiMessage(e))

      getCourseAvailableAssessments(id)
        .then((res) => {
          setCourseAssessmentsAvailable(res.data)
        })
        .catch((e) => apiMessage(e))

      // Course item
      getCourseItemsRel(id)
        .then((res) => {
          setCourseItems(res.data)
        })
        .catch((e) => apiMessage(e))

      getCourseAvailableItems(id)
        .then((res) => {
          setCourseItemsAvailable(res.data)
        })
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

      <Modal
        open={isCourseAssessmentEdit}
        title="Insert course assessments"
        onClose={handleClose}
      >
        <CourseAssessmentRelList
          id={course.id}
          items={courseAssessmentsAvailable}
          key={courseItemEditData?.id}
          onClose={handleClose}
        />
      </Modal>

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

      <main className="course-view">
        {/* Data components */}

        <Course
          course={course}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
        />

        <CourseAssessments
          items={courseAssessments}
          onAdd={handleAddCourseAssessment}
          onDelete={handleDeleteCourseAssessment}
          key={courseAssessmentEditData?.id}
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
