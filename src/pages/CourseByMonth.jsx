import { Link } from 'react-router-dom'

import { CourseByMonth as CourseByMonthComponent } from '@/components'

const CourseByMonth = () => {
  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/reporting">Reporting</Link>
          </li>
          <li>Courses by Month</li>
        </ul>
      </nav>

      <CourseByMonthComponent />
    </main>
  )
}

export default CourseByMonth
