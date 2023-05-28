import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListView, Loading, AddButton } from '../components'

import useCourseAssesments from '../hooks/useCourseAssesments'
import useNoficication from '../hooks/useNotification'

import { initialValues } from '../helpers'

const CourseAssesments = () => {
  const {
    courseAssesments,
    load: loadCourseAssesments,
    remove: removeCourseAssesment
  } = useCourseAssesments()
  const { data, isLoading, isSuccess, isError, error, isFirstLoad } =
    courseAssesments

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNoficication()

  useEffect(() => {
    loadCourseAssesments(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    if (isFirstLoad) {
      loadCourseAssesments(pagination)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstLoad])

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

  const handleEdit = (courseAssesment) =>
    navigate(`/course-assesment/${courseAssesment.id}`)

  const handleDelete = (courseAssesment) =>
    removeCourseAssesment(courseAssesment.id)

  const fields = [{ name: 'name', label: 'Name' }]

  return (
    <main className="container">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Course Assesments</li>
        </ul>
      </nav>

      <AddButton url="/course-assesment" />

      <ListView
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        loadItems={loadCourseAssesments}
      />
    </main>
  )
}

export default CourseAssesments
