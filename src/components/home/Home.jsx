import { Loading } from '../shared'
import './home.css'

export const Home = ({ loading }) => {
  return (
    loading ?
      <Loading />
      :
      <article className='home'>
        <figure>
          <img src="assets/logo.jpg" alt="logo" />
        </figure>
        <article>
          <center>
            Work in progress...
          </center>
        </article>
      </article>
  )
}
