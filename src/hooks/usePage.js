import { PageContext } from '@/context'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

const usePage = () => {
  const location = useLocation()

  const { setPage, page } = useContext(PageContext)

  const set = (title) =>
    setPage({ title, location: title ? location : undefined })

  return { set, page }
}

export default usePage
