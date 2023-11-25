import { Link } from 'react-router-dom'
import { Backup as BackupComponent } from '@/components'

const Backup = () => (
  <main className="container-fluid">
    <nav aria-label="breadcrumb" className="breadcrumb">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>Backup processes</li>
      </ul>
    </nav>
    <article className="form-container">
      <BackupComponent />
    </article>
  </main>
)

export default Backup
