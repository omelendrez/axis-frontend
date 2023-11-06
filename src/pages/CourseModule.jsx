import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { CourseModule as CourseModuleComponent } from '@/components'
import { getCourseModule } from '@/services'

import useApiMessages from '@/hooks/useApiMessages'

const CourseModule = () => {
  const params = useParams()
  const { apiMessage } = useApiMessages()
  const [courseModule, setCourseModule] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getCourseModule(id)
        .then((res) => setCourseModule(res.data))
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
            <Link to="/course-modules">Course Modules</Link>
          </li>
          <li>Course Module</li>
        </ul>
      </nav>
      <article className="form-container">
        <CourseModuleComponent courseModule={courseModule} />
      </article>
    </main>
  )
}

export default CourseModule
