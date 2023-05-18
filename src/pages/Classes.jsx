import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListView, Loading, AddButton } from '../components'

import useClasses from '../hooks/useClasses'
import useNoficication from '../hooks/useNotification'

import { initialValues } from '../helpers'

const Classes = () => {
  const { classes, load: loadClasses, remove: removeClass } = useClasses()
  const { data, isLoading, isSuccess, isError, error, isFirstLoad } = classes

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNoficication()

  useEffect(() => {
    loadClasses(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    if (isFirstLoad) {
      loadClasses(pagination)
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

  const handleEdit = (classroom) => {
    navigate(`/class/${classroom.id}`)
  }

  const handleDelete = (classroom) => {
    removeClass(classroom.id)
  }

  const fields = [
    { name: 'id', label: 'Class' },
    { name: 'course_name', label: 'Course' },
    { name: 'start', label: 'Start' },
    { name: 'learners', label: 'Learners' }
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
          <li>Classes</li>
        </ul>
      </nav>

      <AddButton url="/class" />

      <ListView
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        loadItems={loadClasses}
      />
    </main>
  )
}

export default Classes
