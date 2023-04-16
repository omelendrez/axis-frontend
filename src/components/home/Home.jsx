import { Loading } from '../shared'

export const Home = ({ loading }) => {
  if (loading) {
    return <Loading />
  }
  return (
    <main className='home'>
      <figure>
        <img src="assets/logo.jpg" alt="logo" />
      </figure>
      <article>
        <center>
          Work in progress...
        </center>
      </article>
    </main>
  )
}
