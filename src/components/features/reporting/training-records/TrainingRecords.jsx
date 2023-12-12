import { useEffect, useState } from 'react'
import writeXlsxFile from 'write-excel-file'

import { Button, Divider } from '@/components/shared'
import { DropdownSearch, InputField } from '@/components'

import usePage from '@/hooks/usePage'
import useCompanies from '@/hooks/useCompanies'
import useCourses from '@/hooks/useCourses'
import useApiMessages from '@/hooks/useApiMessages'

import { formatYMD, formatShortDate } from '@/helpers'

import { getTrainingRecords } from '@/services'

import { schema } from './trainingRecordsSchema'

import expirationRanges from './expirationRanges.json'

import './trainingRecords.css'

export const TrainingRecords = () => {
  const [records, setRecords] = useState([])

  const [isLoading, setIsLoading] = useState(false)

  const [isFilterOpen, setIsFilterOpen] = useState(true)

  const [company, setCompany] = useState(null)
  const [course, setCourse] = useState(null)
  const [expiry, setExpiry] = useState(null)
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)

  const [companiesList, setCompaniesList] = useState([])
  const [coursesList, setCoursesList] = useState([])

  const { set: setPage } = usePage()

  const { load: loadCompanies, companies } = useCompanies()

  const { data: compList } = companies

  const { load: loadCourses, courses } = useCourses()

  const { data: courseList } = courses

  const { apiMessage } = useApiMessages()

  useEffect(() => {
    setPage('Training records')
    loadCompanies()
    loadCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (compList.count) {
      setCompaniesList(
        compList.rows.map((c) => ({
          id: c.id,
          name: c.name
        }))
      )
    }
  }, [compList])

  useEffect(() => {
    if (courseList.count) {
      setCoursesList(
        courseList.rows.map((c) => ({
          id: c.id,
          name: c.name
        }))
      )
    }
  }, [courseList])

  const handleLoadData = () => {
    setRecords([])
    setIsLoading(true)
    const payload = {
      course,
      company,
      expiry,
      start,
      end
    }

    getTrainingRecords(payload)
      .then((res) => {
        setRecords(res.data.data)
        apiMessage(res)
        if (res.data.data.length) {
          setIsFilterOpen(false)
        }
      })
      .catch((err) => {
        apiMessage(err)
        setIsFilterOpen(true)
        console.log(err)
      })
      .finally(() => setIsLoading(false))
  }

  const handleExport = (e) => {
    e.preventDefault()
    writeXlsxFile(records, {
      schema,
      headerStyle: {
        backgroundColor: '#eaeaea',
        fontWeight: 'bold',
        align: 'center'
      },
      fileName: `Training Records ${formatYMD(new Date())}.xlsx`
    })
  }

  const handleChange = (e) => {
    setRecords([])
    const { id, value } = e.target
    switch (id) {
      case 'course':
        setCourse(value)
        break
      case 'company':
        setCompany(value)
        break
      case 'expiry':
        setExpiry(value)
        break
      case 'start':
        setStart(value)
        break
      case 'end':
        setEnd(value)
        break
      default:
    }
  }

  const handleResetFilters = (e) => {
    setCourse(null)
    setCompany(null)
    setExpiry(null)
    setStart(null)
    setEnd(null)
    setRecords([])
    setIsFilterOpen(true)
  }

  const handleToggle = (e) => {
    e.preventDefault()
    setIsFilterOpen((f) => !f)
  }

  const hasFilters = company || course || expiry || start || end

  return (
    <main className="container-fluid training-records">
      <details open={isFilterOpen} onClick={handleToggle}>
        <summary>Filters</summary>
        <p onClick={(e) => e.stopPropagation()}>
          <section className="form-area">
            <DropdownSearch
              id="expiry"
              label="Expiry certificate range"
              onChange={handleChange}
              value={expiry}
              options={expirationRanges}
              hideLabel
            />
            <DropdownSearch
              id="course"
              label="Course"
              onChange={handleChange}
              value={course}
              options={coursesList}
              hideLabel
            />
            <DropdownSearch
              id="company"
              label="learner Company"
              onChange={handleChange}
              value={company}
              options={companiesList}
              hideLabel
            />
            <InputField
              id="start"
              label="Start"
              type="date"
              value={start}
              onChange={handleChange}
            />
            <InputField
              id="end"
              label="End"
              type="date"
              value={end}
              onChange={handleChange}
            />
          </section>
        </p>
      </details>

      <div className="export-button-container">
        <Button onClick={handleLoadData} aria-busy={isLoading}>
          Load
        </Button>
        {hasFilters && (
          <Button onClick={handleResetFilters} aria-busy={isLoading}>
            Reset
          </Button>
        )}
        {records.length > 0 && (
          <Button onClick={handleExport} disabled={isLoading}>
            Export
          </Button>
        )}
      </div>
      <Divider style={{ margin: '1rem 0' }} />
      <figure>
        <table>
          <thead>
            <tr>
              {schema.map((f, i) => (
                <th key={i}>{f.column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.row_num}>
                {Object.entries(r).map((key) => (
                  <Value key={key[0]} data={key} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </main>
  )
}

const Value = ({ data }) => {
  const [key, value] = data

  let v

  switch (key) {
    case 'birth_date':
    case 'start':
    case 'end':
    case 'expiry':
      v = value ? formatShortDate(value) : null
      break
    default:
      v = value
  }

  return <td key={key}>{v}</td>
}
