import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListView, Loading, AddButton } from '../components'

import useCourses from '../hooks/useCourses'
import useNoficication from '../hooks/useNotification'

import { initialValues } from '../helpers'

const Courses = () => {
  const { courses, load: loadCourses, remove: removeCourse } = useCourses()
  const { data, isLoading, isSuccess, isError, error, isFirstLoad } = courses

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNoficication()

  useEffect(() => {
    loadCourses(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    if (isFirstLoad) {
      loadCourses(pagination)
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

  const handleEdit = (course) => {
    navigate(`/course/${course.id}`)
  }

  const handleDelete = (course) => {
    removeCourse(course.id)
  }

  const handleBack = (e) => {
    e.preventDefault()
    navigate(-1)
  }

  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'cert_type_name', label: 'Type' }
  ]

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard" onClick={handleBack}>
              Dashboard
            </Link>
          </li>
          <li>Courses</li>
        </ul>
      </nav>

      <AddButton url="/course" />

      <ListView
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        loadItems={loadCourses}
      />
    </main>
  )
}

export default Courses
