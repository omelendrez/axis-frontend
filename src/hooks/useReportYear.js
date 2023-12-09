import { useEffect, useState } from 'react'

import { SP, KEYS } from '@/services'

const session = new SP()

const useReportYear = () => {
  const key = KEYS.year

  let lastYear = session.get(key)

  lastYear = !lastYear ? new Date().getFullYear() : lastYear

  const [year, setY] = useState(lastYear)

  useEffect(() => {
    if (year) {
      session.save(key, year)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year])

  const setYear = (values) => {
    setY(values)
  }

  return {
    year,
    setYear
  }
}

export default useReportYear
