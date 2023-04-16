import { Link } from "react-router-dom"

export const Dashboard = () => {
  return (
    <main className="container-fluid">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li>Dashboard</li>
        </ul>
      </nav>
      <p>
        Work in progress...
      </p>
    </main>
  )
}
