import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CardList, Loading, AddButton, Tag } from '../components'

import useCourses from '../hooks/useCourses'
import useNoficication from '../hooks/useNotification'

import { initialValues } from '../helpers'

import './course-card.css'

const Card = ({ item, onView }) => (
  <article className="card" onClick={() => onView(item)}>
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

  // const handleDelete = (course) => {
  //   removeCourse(course.id)
  // }

  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'cert_type_name', label: 'Type' }
  ]

  return (
    <main className="container">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>Courses</li>
        </ul>
      </nav>

      <AddButton url="/course" />
      <CardList
        Card={Card}
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onView={handleEdit}
        isLoading={isLoading}
        loadItems={loadCourses}
      />
    </main>
  )
}

export default Courses
