import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, CardList, AddButton, Tag } from '@/components'

import useCourses from '@/hooks/useCourses'
import useNotification from '@/hooks/useNotification'

import { initialValues } from '@/helpers'

import './course-card.css'
import usePage from '@/hooks/usePage'

const Card = ({ item, onView }) => (
  <article className="card courses" onClick={() => onView(item)}>
    <div className="card-body">
      <div className="ellipsis">{item.name}</div>
      <div className="small-font">
        Duration: {item.duration} day(s)
        {item.validity ? `, validity ${item.validity} year(s)` : null}
      </div>
      <div className="small-font">{item.expiry_type_name}</div>
      <div className="small-font">
        {item.id_card === 'Yes' ? 'Includes ID card' : null}
      </div>
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
  const { set: setPage } = usePage()

  useEffect(() => {
    loadCourses(pagination)
    setPage('Courses')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

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
      />
    </main>
  )
}

export default Courses
