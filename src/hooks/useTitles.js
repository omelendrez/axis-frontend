import { useSelector, useDispatch } from 'react-redux'
import { loadTitles } from '../reducers/title/titleSlice'

const useTitles = () => {
  const dispatch = useDispatch()
  const titles = useSelector((state) => state.titles)

  const load = (search) => dispatch(loadTitles(search))

  return {
    titles,
    load
  }
}

export default useTitles
