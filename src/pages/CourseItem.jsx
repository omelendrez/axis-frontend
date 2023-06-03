import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { CourseItem as CourseItemComponent } from '../components'
import { getCourseItem } from '../services'

import useApiMessages from '../hooks/useApiMessages'

const CourseItem = () => {
  const params = useParams()
  const { apiMessage } = useApiMessages()
  const [courseItem, setCourseItem] = useState(null)

  useEffect(() => {
    const id = params?.id
    if (id) {
      getCourseItem(id)
        .then((res) => setCourseItem(res.data))
        .catch((e) => apiMessage(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  return (
    <main className="container">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/course-items">Course Items</Link>
          </li>
          <li>Course Item</li>
        </ul>
      </nav>
      <article className="form-container">
        <CourseItemComponent courseItem={courseItem} />
      </article>
    </main>
  )
}

export default CourseItem
