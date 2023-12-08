import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListView, Loading, AddButton } from '@/components'

import useCourseModules from '@/hooks/useCourseModules'
import useNotification from '@/hooks/useNotification'
import usePagination from '@/hooks/usePagination'

const CourseModules = () => {
  const {
    courseModules,
    load: loadCourseModules,
    remove: removeCourseModule
  } = useCourseModules()
  const { data, isLoading, isSuccess, isError, error } = courseModules

  const { pagination, setPagination } = usePagination()

  const navigate = useNavigate()
  const { set } = useNotification()

  useEffect(() => {
    loadCourseModules(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    loadCourseModules(pagination)

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

  const handleEdit = (courseModule) =>
    navigate(`/course-module/${courseModule.id}`)

  const handleDelete = (courseModule) => removeCourseModule(courseModule.id)

  const fields = [{ name: 'name', label: 'Name' }]

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Course Modules</li>
        </ul>
      </nav>

      <AddButton url="/course-module" />

      <ListView
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </main>
  )
}

export default CourseModules
