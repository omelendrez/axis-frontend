import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListView, TableButtonRow, Loading } from '../components'
import useCourses from '../hooks/useCourses'
import useNoficication from '../hooks/useNotification'

const Courses = () => {
  const { courses, load: loadCourses, remove: removeCourse } = useCourses()
  const { data, isLoading, isSuccess, isError, error } = courses

  const navigate = useNavigate()
  const { set } = useNoficication()

  useEffect(() => {
    if (!data.length) {
      loadCourses()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courses])

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

  const fields = [
    { name: 'code', label: 'Code' },
    { name: 'name', label: 'Name' },
    { name: 'validity', label: 'Validity' },
    { name: 'duration', label: 'Duration' },
    { name: 'id_card', label: 'Card?' },
    { name: 'front_id', label: 'ID front' },
    { name: 'back_id', label: 'ID back' },
    { name: 'cert_type_name', label: 'Type' },
    { name: 'cert_id_card', label: 'Cert. card?' },
    { name: 'opito_reg_code', label: 'Reg. code' }
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
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>Courses</li>
        </ul>
      </nav>

      <TableButtonRow url="/course" label="Add course" />

      <ListView
        items={data}
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
