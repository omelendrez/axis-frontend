import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListView, Loading, AddButton } from '@/components'

import useCourseAssessments from '@/hooks/useCourseAssessments'
import useNotification from '@/hooks/useNotification'

import { initialValues } from '@/helpers'

const CourseAssessments = () => {
  const {
    courseAssessments,
    load: loadCourseAssessments,
    remove: removeCourseAssessment
  } = useCourseAssessments()
  const { data, isLoading, isSuccess, isError, error } = courseAssessments

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNotification()

  useEffect(() => {
    loadCourseAssessments(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    loadCourseAssessments(pagination)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isError) {
      const notification = {
        type: 'error',
        message: error.message
      }
      set(notification)
    }
    if (isSuccess) {
      const notification = {
        type: 'success',
        message: 'Operation completed successfully'
      }
      set(notification)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess])

  const handleEdit = (courseAssessment) =>
    navigate(`/course-assessment/${courseAssessment.id}`)

  const handleDelete = (courseAssessment) =>
    removeCourseAssessment(courseAssessment.id)

  const fields = [{ name: 'name', label: 'Name' }]

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Course Assessments</li>
        </ul>
      </nav>

      <AddButton url="/course-assessment" />

      <ListView
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        loadItems={loadCourseAssessments}
      />
    </main>
  )
}

export default CourseAssessments
