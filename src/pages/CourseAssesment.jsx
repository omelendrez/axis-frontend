import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { CourseAssesment as CourseAssesmentComponent } from '../components'
import { getCourseAssesment } from '../services'
import { handleError } from '../reducers/error'

const CourseAssesment = () => {
  const params = useParams()
  const [courseAssesment, setCourseAssesment] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getCourseAssesment(id)
        .then((res) => setCourseAssesment(res.data))
        .catch((e) => handleError(e))
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
            <Link to="/course-assesments">Course Assesments</Link>
          </li>
          <li>Course Assesment</li>
        </ul>
      </nav>
      <article className="form-container">
        <CourseAssesmentComponent courseAssesment={courseAssesment} />
      </article>
    </main>
  )
}

export default CourseAssesment