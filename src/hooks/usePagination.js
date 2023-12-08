import { useEffect, useState } from 'react'
import { paginationInitialValues } from '@/helpers'
import { SP, KEYS } from '@/services'

import { useLocation } from 'react-router-dom'

const session = new SP()

const usePagination = () => {
  const location = useLocation()
  const url = location.pathname
  const feature = url.replace('/', '')
  const key = `${KEYS.pagination}-${feature}`

  let lastPag = session.get(key)
  if (!lastPag) {
    lastPag = paginationInitialValues
  }

  const [pagination, setPag] = useState(lastPag)

  useEffect(() => {
    if (pagination) {
      session.save(key, pagination)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  const setPagination = (values) => {
    setPag(values)
  }

  return {
    pagination,
    setPagination
  }
}

export default usePagination
