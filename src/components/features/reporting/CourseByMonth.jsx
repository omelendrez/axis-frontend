import { useEffect, useMemo, useState } from 'react'
import { Chart } from 'react-charts'

import { YearInput } from './YearInput'

import usePage from '@/hooks/usePage'
import useApiMessages from '@/hooks/useApiMessages'
import useReportYear from '@/hooks/useReportYear'
import useCourses from '@/hooks/useCourses'

import { getActivePeriod, getCourseMonthByYear } from '@/services'

import './report-chart.css'
import './course-by-month.css'

import { DropdownSearch } from '@/components/shared'
import { defaultReportData } from '@/helpers'

export const CourseByMonth = () => {
  const { set: setPage } = usePage()

  const [years, setYears] = useState([])

  const { year, setYear } = useReportYear()

  const [currentCourse, setCurrentCourse] = useState(null)

  const [isDisabled, setIsDisabled] = useState(false)

  const [isHidding, setIsHidding] = useState(true)

  const [mainData, setMainData] = useState([])

  const [data, setData] = useState([])

  const { courses, load: loadCourses } = useCourses()

  const { data: coursesList } = courses

  const [courseList, setCourseList] = useState([])

  const { apiMessage } = useApiMessages()

  useEffect(() => {
    setPage('Courses by month')

    loadCourses()

    getActivePeriod()
      .then((res) => setYears(res.data))
      .catch((e) => apiMessage(e))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (coursesList.count) {
      const rows = coursesList?.rows?.map((c) => ({
        id: c.id,
        name: c.name
      }))

      setCourseList(rows)

      setCurrentCourse(rows[0].id)
    }
  }, [coursesList])

  useEffect(() => {
    const results = []

    if (mainData.length) {
      let defaultData = defaultReportData

      mainData
        .filter((d) => d.c === currentCourse)
        .forEach((d) => {
          const { month, value } = d
          defaultData = defaultData.map((r) => {
            if (r.month === month) {
              return { month, value }
            }
            return r
          })
        })

      const row = {
        label: 'Delegates',
        data: defaultData
      }
      results.push(row)
      setData(results)
      setIsHidding(false)
    }
  }, [mainData, currentCourse])

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
      .then((res) => setMainData(res.data))
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

  const handleChangeCourse = (e) => {
    const id = parseInt(e.target.value || 0)
    setCurrentCourse(id)
  }

  const options = courseList.filter((c) =>
    mainData
      .filter((r) => r.value > 0)
      .map((r) => r.c)
      .includes(c.id)
  )

  return (
    <main className="container reporting">
      <YearInput
        year={year}
        onLoadClick={handleLoadData}
        disabled={isDisabled}
        onChange={handleYearChange}
      />

      {mainData.length > 0 && (
        <section className="dropdown-container">
          <DropdownSearch
            id="course"
            label="Course"
            onChange={handleChangeCourse}
            value={currentCourse}
            options={options}
            hideLabel
          />
        </section>
      )}

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
