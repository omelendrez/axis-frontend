import { useEffect, useMemo, useState } from 'react'
import { Chart } from 'react-charts'

import usePage from '@/hooks/usePage'
import useApiMessages from '@/hooks/useApiMessages'

import { Button, InputField } from '@/components'

import { getCourseByYear, getCourseYears } from '@/services'

import './courseByMonth.css'

export const CourseByMonth = () => {
  const { set: setPage } = usePage()

  const [years, setYears] = useState([])

  const [year, setYear] = useState(null)

  const [isDisabled, setIsDisabled] = useState(true)

  const [isHidding, setIsHidding] = useState(true)

  const [data, setData] = useState([])

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

    getCourseByYear(year)
      .then((res) => {
        const data = res.data.map((d) => {
          const { course, value } = d
          return { course, value }
        })

        const results = [
          {
            label: 'Courses',
            data
          }
        ]

        setData(results)
        setIsHidding(false)
      })
      .catch((e) => apiMessage(e))

    setIsDisabled(true)
  }

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum) => datum.course
    }),
    []
  )

  const secondaryAxes = useMemo(
    () => [
      {
        getValue: (datum) => datum.value,
        stacked: true
      }
    ],
    []
  )

  return (
    <main className="container reporting">
      <div className="reporting-chart-input">
        <InputField
          type="number"
          id="year"
          label="Year"
          value={year}
          onChange={handleYearChange}
        />
        <Button onClick={handleLoadData} disabled={isDisabled}>
          load
        </Button>
      </div>
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
