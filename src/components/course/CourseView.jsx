import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { Loading, Modal } from '../shared'

import { Course, CourseItems, CourseAssesments } from './course-view'
import { CourseForm } from '..'
import { CourseItemRels as CourseItemRelForm } from './course-item-rel'
import { CourseAssesmentRels as CourseAssesmentRelForm } from './course-assesment-rel'

import useNoficication from '../../hooks/useNotification'
import useApiMessages from '../../hooks/useApiMessages'

import courseItemFields from './course-view/course-item-fields.json'
import courseAssesmentFields from './course-view/course-assesment-fields.json'

import {
  deleteCourse,
  deleteCourseAssesmentRel,
  deleteCourseItemRel,
  getCourse,
  getCourseAssesmentsRel,
  getCourseAvailableAssesments,
  getCourseAvailableItems,
  getCourseItemsRel,
  getCourseView
} from '../../services'

import './courseView.css'

export const CourseView = () => {
  const params = useParams()
  const navigate = useNavigate()
  const { set } = useNoficication()
  const { apiMessage } = useApiMessages()

  const [isDeleting, setIsDeleting] = useState(false)

  const [course, setCourse] = useState(null)
  const [courseEditData, setCourseEditData] = useState(null)
  const [isCourseEdit, setIsCourseEdit] = useState(false)

  const [courseItems, setCourseItems] = useState([])
  const [courseItemEditData, setCourseItemEditData] = useState(null)
  const [courseItemsAvailable, setCourseItemsAvailable] = useState([])
  const [isCourseItemEdit, setIsCourseItemEdit] = useState(false)

  const [courseAssesments, setCourseAssesments] = useState([])
  const [courseAssesmentEditData, setCourseAssesmentEditData] = useState(null)
  const [courseAssesmentsAvailable, setCourseAssesmentsAvailable] = useState([])
  const [isCourseAssesmentEdit, setIsCourseAssesmentEdit] = useState(false)

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
    setIsDeleting(true)
    deleteCourse(id)
      .then((res) => {
        apiMessage(res)
        navigate('/courses')
      })
      .catch((e) => apiMessage(e))
  }

  // Course assesment
  const handleAddCourseAssesment = (e) => {
    e.preventDefault()

    const fields = courseAssesmentFields.map((f) => f.field)

    const fieldData = {}
    fields.forEach((f) => (fieldData[f] = ''))

    setCourseAssesmentEditData({ ...fieldData, course: id, id: undefined })
    setIsCourseAssesmentEdit(true)
  }

  const handleDeleteCourseAssesment = (courseAssesmentId) =>
    deleteCourseAssesmentRel(courseAssesmentId)
      .then((res) => {
        const notification = {
          type: 'success',
          message: res.data.message
        }
        set(notification)
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
        const notification = {
          type: 'success',
          message: res.data.message
        }
        set(notification)
      })
      .catch((e) => apiMessage(e))

  const handleClose = (e) => {
    e?.preventDefault()

    if (isCourseAssesmentEdit) {
      setCourseAssesmentEditData(null)
      setIsCourseAssesmentEdit(false)
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
    if (id && !isDeleting) {
      // Course
      getCourseView(id)
        .then((res) => {
          setCourse(res.data)
        })
        .catch((e) => apiMessage(e))

      // Course assesment
      getCourseAssesmentsRel(id)
        .then((res) => {
          setCourseAssesments(res.data)
        })
        .catch((e) => apiMessage(e))

      getCourseAvailableAssesments(id)
        .then((res) => {
          setCourseAssesmentsAvailable(res.data)
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
  }, [params, id])

  if (!course) {
    return <Loading />
  }

  return (
    <>
      {/* Edit modals  */}

      <Modal open={isCourseEdit} title="Edit course" onClose={handleClose}>
        <CourseForm course={courseEditData} onClose={handleClose} />
      </Modal>

      <Modal
        open={isCourseAssesmentEdit}
        title="Insert course assesments"
        onClose={handleClose}
      >
        <CourseAssesmentRelForm
          onClose={handleClose}
          items={courseAssesmentsAvailable}
          course={course.id}
          key={courseItemEditData?.id}
        />
      </Modal>

      <Modal
        open={isCourseItemEdit}
        title="Insert course items"
        onClose={handleClose}
      >
        <CourseItemRelForm
          onClose={handleClose}
          items={courseItemsAvailable}
          course={course.id}
          key={courseItemEditData?.id}
        />
      </Modal>

      <main className="course-view">
        {/* Data components */}

        <Course
          course={course}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
        />

        <CourseAssesments
          items={courseAssesments}
          onAdd={handleAddCourseAssesment}
          onDelete={handleDeleteCourseAssesment}
          key={courseAssesmentEditData?.id}
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
