import { useEffect, useState } from 'react'
import { Home as HomeComponent } from '../components'

const Home = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <main className="container-fluid">
      <HomeComponent loading={loading} />
    </main>
  )
}

export default Home
