import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Loading, Modal } from '../shared'

import { Course, CourseItems } from './course-view'
import { Course as CourseForm } from '..'
import { CourseItemRels as CourseItemRelForm } from './course-item-rel'

import useNoficication from '../../hooks/useNotification'
import courseItemFields from './course-view/course-item-fields.json'

import {
  deleteCourseItemRel,
  getCourse,
  getCourseView,
  getCourseItemsRel,
  getCourseAvailableItems
} from '../../services'

import { handleError } from '../../reducers/error'

import './courseView.css'

export const CourseView = () => {
  const params = useParams()
  const { set } = useNoficication()
  const [course, setCourse] = useState(null)

  const [courseItems, setCourseItems] = useState([])
  const [courseItemEditData, setCourseItemEditData] = useState(null)
  const [courseEditData, setCourseEditData] = useState(null)

  const [courseItemsAvailable, setCourseItemsAvailable] = useState([])

  const [isCourseItemEdit, setIsCourseItemEdit] = useState(false)
  const [isCourseEdit, setIsCourseEdit] = useState(false)

  const id = params?.id

  const handleEditCourse = (e) => {
    e?.preventDefault()
    getCourse(id)
      .then((res) => {
        setCourseEditData(res.data)
        setIsCourseEdit(true)
      })
      .catch((e) => handleError(e))
  }

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
      .catch((e) => handleError(e))

  const handleClose = (e) => {
    e?.preventDefault()

    getCourseView(id)
      .then((res) => {
        setCourse(res.data)
        if (isCourseItemEdit) {
          setCourseItemEditData(null)
          setIsCourseItemEdit(false)
        }
        if (isCourseEdit) {
          setCourseEditData(null)
          setIsCourseEdit(false)
        }
      })
      .catch((e) => handleError(e))

    getCourseItemsRel(id)
      .then((res) => {
        setCourseItems(res.data)
      })
      .catch((e) => handleError(e))

    getCourseAvailableItems(id)
      .then((res) => {
        setCourseItemsAvailable(res.data)
      })
      .catch((e) => handleError(e))
  }

  useEffect(() => {
    if (id) {
      getCourseView(id)
        .then((res) => {
          setCourse(res.data)
        })
        .catch((e) => handleError(e))

      getCourseItemsRel(id)
        .then((res) => {
          setCourseItems(res.data)
        })
        .catch((e) => handleError(e))

      getCourseAvailableItems(id)
        .then((res) => {
          setCourseItemsAvailable(res.data)
        })
        .catch((e) => handleError(e))
    }
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

        <div>
          <Course course={course} onEdit={handleEditCourse} />

          <CourseItems
            courseItems={courseItems}
            onAdd={handleAddCourseItem}
            onDelete={handleDeleteCourseItem}
            key={courseItemEditData?.id}
          />
        </div>
      </main>
    </>
  )
}
