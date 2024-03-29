import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListView, Loading, AddButton } from '@/components'

import useCourseItems from '@/hooks/useCourseItems'
import useNotification from '@/hooks/useNotification'
import usePagination from '@/hooks/usePagination'

const CourseItems = () => {
  const {
    courseItems,
    load: loadCourseItems,
    remove: removeCourseItem
  } = useCourseItems()
  const { data, isLoading, isSuccess, isError, error } = courseItems

  const { pagination, setPagination } = usePagination()

  const navigate = useNavigate()
  const { set } = useNotification()

  useEffect(() => {
    loadCourseItems(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    loadCourseItems(pagination)

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

  const handleEdit = (courseItem) => navigate(`/course-item/${courseItem.id}`)

  const handleDelete = (courseItem) => removeCourseItem(courseItem.id)

  const fields = [{ name: 'name', label: 'Name' }]

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Course Items</li>
        </ul>
      </nav>

      <AddButton url="/course-item" />

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

export default CourseItems
