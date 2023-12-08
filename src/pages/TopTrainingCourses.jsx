import { Link } from 'react-router-dom'

import { TopTrainingCourses as TopTrainingCoursesComponent } from '@/components'

const TopTrainingCourses = () => {
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
          <li>Top Training Courses</li>
        </ul>
      </nav>
      <article className="form-container">
        <TopTrainingCoursesComponent />
      </article>
    </main>
  )
}

export default TopTrainingCourses
