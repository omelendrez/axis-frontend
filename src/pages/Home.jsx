import { Home as HomeComponent } from '@/components'
import usePage from '@/hooks/usePage'
import { useEffect } from 'react'

const Home = () => {
  const { set: setPage } = usePage()

  useEffect(() => {
    setPage('Home')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="container-fluid menu">
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
