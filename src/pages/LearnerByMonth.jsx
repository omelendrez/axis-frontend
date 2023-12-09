import { Link } from 'react-router-dom'

import { LearnerByMonth as LearnerByMonthComponent } from '@/components'

const LearnerByMonth = () => {
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
          <li>Learners Trained by Month</li>
        </ul>
      </nav>
      <LearnerByMonthComponent />
    </main>
  )
}

export default LearnerByMonth
