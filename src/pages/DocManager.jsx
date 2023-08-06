import { useEffect, useState } from 'react'
import useCourses from '@/hooks/useCourses'
import useNotification from '@/hooks/useNotification'
import { CardList, Loading, Tag } from '@/components'
import usePage from '@/hooks/usePage'
import { initialValues } from '@/helpers'
import { Link, useNavigate } from 'react-router-dom'
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

const DocManager = () => {
  const { courses, load: loadCourses } = useCourses()
  const { set } = useNotification()
  const { set: setPage } = usePage()
  const navigate = useNavigate()

  const { data, isLoading, isSuccess } = courses

  const [pagination, setPagination] = useState(initialValues)

  useEffect(() => {
    loadCourses(pagination)
    setPage('Document manager')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    if (isSuccess) {
      const notification = {
        type: 'success',
        message: 'Record updated successfully'
      }
      set(notification)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  const handleView = (course) => {
    navigate(`/document-manager/${course.id}`)
  }

  return (
    <main className="container-fluid doc-manager-container">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Document Manager</li>
        </ul>
      </nav>

      <CardList
        Card={Card}
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        onView={handleView}
        isLoading={isLoading}
      />
    </main>
  )
}

export default DocManager
