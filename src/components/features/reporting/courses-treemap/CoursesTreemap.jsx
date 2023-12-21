import { useEffect, useState } from 'react'

import { YearInput } from '../YearInput'

import { Tooltip } from './Tooltip'

import usePage from '@/hooks/usePage'
import useApiMessages from '@/hooks/useApiMessages'
import useReportYear from '@/hooks/useReportYear'

import { getCourseTypeByYear, getActivePeriod } from '@/services'

import { Treemap } from '@/components/shared'

import '../report-chart.css'
import './reporting-treemap.css'

import { capitalize } from '@/helpers'

export const CoursesTreemap = () => {
  const { set: setPage } = usePage()

  const [years, setYears] = useState([])

  const { year, setYear } = useReportYear()

  const [isDisabled, setIsDisabled] = useState(false)

  const [isHidding, setIsHidding] = useState(true)

  const [isLoading, setIsLoading] = useState(false)

  const [data, setData] = useState(null)

  const [d, setD] = useState(null)

  const [tooltipPosition, setTooltipPosition] = useState(null)

  const { apiMessage } = useApiMessages()

  useEffect(() => {
    setPage('Courses treemap')

    getActivePeriod()
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
    setIsLoading(true)
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
            children = [
              {
                category: type,
                name: capitalize(course),
                value: count
              }
            ]
          }
        })
        const row = {
          name: type,
          children
        }
        results.push(row)

        setData({ name: 'Data', children: results })

        setIsHidding(false)
      })
      .catch((e) => apiMessage(e))
      .finally(() => {
        setIsDisabled(true)
        setIsLoading(false)
      })
  }

  const handleOnHover = (d) => {
    if (d) {
      const data = d.data
      const top = d.y0 + (d.y1 - d.y0)
      const left = d.x0 + (d.x1 - d.x0) / 2
      setD(data)
      setTooltipPosition({ top, left })
    }
  }

  return (
    <main className="container-fluid">
      <YearInput
        year={year}
        onLoadClick={handleLoadData}
        disabled={isDisabled}
        onChange={handleYearChange}
        isLoading={isLoading}
      />

      <div
        className={`reporting-treemap-container ${isHidding ? 'opaque' : ''}`}
      >
        <Treemap
          data={data}
          height={800}
          width={1200}
          onHover={handleOnHover}
        />
      </div>
      {d && tooltipPosition && <Tooltip data={d} position={tooltipPosition} />}
    </main>
  )
}
