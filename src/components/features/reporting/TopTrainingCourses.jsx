import { useEffect, useMemo, useState } from 'react'
import { Chart } from 'react-charts'

import { YearInput } from './YearInput'

import usePage from '@/hooks/usePage'
import useApiMessages from '@/hooks/useApiMessages'
import useReportYear from '@/hooks/useReportYear'

import { getCourseMonthByYear, getCourseYears } from '@/services'

import { defaultReportData } from '@/helpers'

import './report-chart.css'

export const TopTrainingCourses = () => {
  const { set: setPage } = usePage()

  const [years, setYears] = useState([])

  const { year, setYear } = useReportYear()

  const [isDisabled, setIsDisabled] = useState(false)

  const [isHidding, setIsHidding] = useState(true)

  const [data, setData] = useState([])

  const { apiMessage } = useApiMessages()

  useEffect(() => {
    setPage('Top training courses')

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

    getCourseMonthByYear(year)
      .then((res) => {
        const results = []
        let { course } = res.data[0]
        let data = defaultReportData.reverse()
        res.data.forEach((d) => {
          if (course === d.course) {
            const { month, value } = d
            data = data.map((r) => {
              if (r.month === month) {
                return { month, value }
              }
              return r
            })
          } else {
            const row = {
              label: course,
              data: data
            }
            results.push(row)
            course = d.course
            const { month, value } = d
            data = defaultReportData.map((r) => {
              if (r.month === month) {
                return { month, value }
              }
              return r
            })
          }
        })
        const row = {
          label: course,
          data: data
        }
        results.push(row)

        setData(results)

        setIsHidding(false)
      })
      .catch((e) => apiMessage(e))

    setIsDisabled(true)
  }

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.month
    }),
    []
  )

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.value
      }
    ],
    []
  )
  return (
    <main className="container reporting">
      <YearInput
        year={year}
        onLoadClick={handleLoadData}
        disabled={isDisabled}
        onChange={handleYearChange}
      />

      {data.length > 0 && (
        <div
          className={`reporting-chart-container ${isHidding ? 'opaque' : ''}`}
        >
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes
            }}
          />
        </div>
      )}
    </main>
  )
}
