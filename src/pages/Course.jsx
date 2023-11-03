import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { FormContainer, CourseView, CourseForm } from '@/components'
import { getCourse } from '@/services'

import useApiMessages from '@/hooks/useApiMessages'
import usePage from '@/hooks/usePage'

const Course = ({ isViewing, isAdding, isEditing }) => {
  const params = useParams()
  const id = params?.id

  const { apiMessage } = useApiMessages()
  const { set: setPage } = usePage()

  const [course, setCourse] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    setPage('Course')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (id) {
      getCourse(id)
        .then((res) => setCourse(res.data))
        .catch((e) => apiMessage(e))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  const handleClose = (e) => {
    e?.preventDefault()
    navigate('/courses')
  }

  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>Course</li>
        </ul>
      </nav>
      {isViewing && <CourseView course={course} />}

      {isAdding && (
        <FormContainer title="Adding Course data">
          <CourseForm onClose={handleClose} />
        </FormContainer>
      )}
      {isEditing && (
        <FormContainer title="Modifying Course data">
          <CourseForm course={course} />
        </FormContainer>
      )}
    </main>
  )
}

export default Course
