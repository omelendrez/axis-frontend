import { Home as HomeComponent } from '../components'

const Home = () => {
  return (
    <main className="container menu">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>Home</li>
        </ul>
      </nav>
      <HomeComponent />
    </main>
  )
}

export default Home
