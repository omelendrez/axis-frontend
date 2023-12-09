import { Link } from 'react-router-dom'

import { CoursesTreemap as CoursesTreemapComponent } from '@/components'

const CoursesTreemap = () => (
  <main className="container-fluid">
    <nav aria-label="breadcrumb" className="breadcrumb">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/reporting">Reporting</Link>
        </li>
        <li>Courses Treemap</li>
      </ul>
    </nav>
    <CoursesTreemapComponent />
  </main>
)

export default CoursesTreemap
