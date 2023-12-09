import { useEffect, useState } from 'react'

import { YearInput } from './YearInput'

import usePage from '@/hooks/usePage'
import useApiMessages from '@/hooks/useApiMessages'
import useReportYear from '@/hooks/useReportYear'

import { getCourseTypeByYear, getCourseYears } from '@/services'

import './reportChart.css'
import { Treemap } from '@/components/shared'
import { capitalize } from '@/helpers'

export const CoursesTreemap = () => {
  const { set: setPage } = usePage()

  const [years, setYears] = useState([])

  const { year, setYear } = useReportYear()

  const [isDisabled, setIsDisabled] = useState(false)

  const [isHidding, setIsHidding] = useState(true)

  const [data, setData] = useState(null)

  const { apiMessage } = useApiMessages()

  useEffect(() => {
    setPage('Total courses by month')

    getCourseYears()
      .then((res) => setYears(res.data))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleYearChange = (e) => {
    e.preventDefault()
    const { min, max } = years

    const value = e.target.value

    setYear(value)

    setIsHidding(true)

    if (value <= max && value >= min) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }

  const handleLoadData = (e) => {
    e.preventDefault()

    getCourseTypeByYear(year)
      .then((res) => {
        const results = []
        const rows = res.data
        let { type } = rows[0]
        let children = []
        rows.forEach((r) => {
          const { course, count } = r
          if (type === r.type) {
            children.push({
              category: type,
              name: capitalize(course),
              value: count
            })
          } else {
            const row = {
              name: type,
              children
            }
            results.push(row)
            type = r.type
            children = []
          }
        })
        const row = {
          name: type,
          children
        }
        results.push(row)

        setData({ name: 'Test', children: results })

        setIsHidding(false)
      })
      .catch((e) => apiMessage(e))
    setIsDisabled(true)
  }

  return (
    <main className="container-fluid">
      <YearInput
        year={year}
        onLoadClick={handleLoadData}
        disabled={isDisabled}
        onChange={handleYearChange}
      />

      <div
        className={`reporting-treemap-container ${isHidding ? 'opaque' : ''}`}
      >
        <Treemap data={data} height={480} width={1000} />
      </div>
    </main>
  )
}
