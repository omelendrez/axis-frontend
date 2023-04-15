import { Loading, Logo } from '../shared'
import './home.css'

export const Home = ({ loading }) => {
  return (
    loading ?
      <Loading />
      :
      <article className='home'>
        <figure>
          <Logo />
        </figure>
        <h2>
          <center>
            Work in progress...
          </center>
        </h2>
      </article>
  )
}
