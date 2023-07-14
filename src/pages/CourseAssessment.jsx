import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { CourseAssessment as CourseAssessmentComponent } from '@/components'
import { getCourseAssessment } from '@/services'

import useApiMessages from '@/hooks/useApiMessages'

const CourseAssessment = () => {
  const params = useParams()
  const { apiMessage } = useApiMessages()
  const [courseAssessment, setCourseAssessment] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getCourseAssessment(id)
        .then((res) => setCourseAssessment(res.data))
        .catch((e) => apiMessage(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/course-assessments">Course Assessments</Link>
          </li>
          <li>Course Assessment</li>
        </ul>
      </nav>
      <article className="form-container">
        <CourseAssessmentComponent courseAssessment={courseAssessment} />
      </article>
    </main>
  )
}

export default CourseAssessment
