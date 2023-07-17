import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, CardList, AddButton, Tag } from '@/components'

import useCourses from '@/hooks/useCourses'
import useNotification from '@/hooks/useNotification'

import { initialValues } from '@/helpers'

import './course-card.css'

const Card = ({ item, onView }) => (
  <article className="card courses" onClick={() => onView(item)}>
    <div className="card-body">
      <div className="ellipsis">{item.name}</div>
      <div>
        <Tag className={item.cert_type_name}>{item.cert_type_name}</Tag>
        {item.opito_reg_code.trim() && (
          <Tag className="default">{item.opito_reg_code}</Tag>
        )}
      </div>
    </div>
  </article>
)

const Courses = () => {
  const { courses, load: loadCourses } = useCourses()
  const { data, isLoading, isSuccess, isError, error } = courses

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNotification()

  useEffect(() => {
    loadCourses(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    loadCourses(pagination)

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

  const handleView = (course) => {
    navigate(`/course/${course.id}`)
  }

  // const handleDelete = (course) => {
  //   removeCourse(course.id)
  // }

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
          <li>Courses</li>
        </ul>
      </nav>

      <AddButton url="/course/add" />
      <CardList
        Card={Card}
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onView={handleView}
        isLoading={isLoading}
        loadItems={loadCourses}
      />
    </main>
  )
}

export default Courses
