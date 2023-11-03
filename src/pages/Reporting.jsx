import { useEffect, useMemo, useState } from 'react'
import { Chart } from 'react-charts'

import usePage from '@/hooks/usePage'
import { Link } from 'react-router-dom'

import './reporting.css'
import { getCourseMonthByYear, getCourseYears } from '@/services'
import { Button, InputField } from '@/components'
import useApiMessages from '@/hooks/useApiMessages'

const Reporting = () => {
  const { set: setPage } = usePage()

  const [years, setYears] = useState([])

  const [year, setYear] = useState(null)

  const [isDisabled, setIsDisabled] = useState(true)

  const [data, setData] = useState([])

  const { apiMessage } = useApiMessages()

  useEffect(() => {
    setPage('Reporting')

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

    if (value <= max && value >= min) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }

  const defaultData = [
    { month: 'January', value: 0 },
    { month: 'February', value: 0 },
    { month: 'March', value: 0 },
    { month: 'April', value: 0 },
    { month: 'May', value: 0 },
    { month: 'June', value: 0 },
    { month: 'July', value: 0 },
    { month: 'August', value: 0 },
    { month: 'September', value: 0 },
    { month: 'October', value: 0 },
    { month: 'November', value: 0 },
    { month: 'December', value: 0 }
  ]

  const handleLoadData = (e) => {
    e.preventDefault()

    getCourseMonthByYear(year)
      .then((res) => {
        const results = []
        let { course } = res.data[0]
        let data = defaultData
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
            data = defaultData.map((r) => {
              if (r.month === month) {
                return { month, value }
              }
              return r
            })
          }
        })
        setData(results)
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
        getValue: (datum) => datum.value,
        stacked: true
      }
    ],
    []
  )

  return (
    <main className="container reporting">
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Reporting</li>
        </ul>
      </nav>
      <h6>TOP 10 Monthly training courses</h6>
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
        <div className="reporting-chart-container">
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

export default Reporting
