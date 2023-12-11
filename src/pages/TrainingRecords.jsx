import { Link } from 'react-router-dom'

import { TrainingRecords as TrainingRecordsComponent } from '@/components'

const TrainingRecords = () => {
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
          <li>Training Records</li>
        </ul>
      </nav>
      <article className="form-container">
        <TrainingRecordsComponent />
      </article>
    </main>
  )
}

export default TrainingRecords
