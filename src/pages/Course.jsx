import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { Course as CourseComponent } from '../components'
import { getCourse } from '../services'

const Course = () => {
  const params = useParams()
  const [course, setCourse] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getCourse(id).then((res) => setCourse(res.data))
    }
  }, [params])

  return (
    <main className="container">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/courses">Courses</Link>
          </li>
          <li>Course</li>
        </ul>
      </nav>
      <article className="form-container">
        <CourseComponent course={course} />
      </article>
    </main>
  )
}

export default Course
