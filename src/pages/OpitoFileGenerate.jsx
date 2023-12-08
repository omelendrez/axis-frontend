import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CardList, Divider, Loading } from '@/components'

import {
  getOpitoFileList,
  getOpitoFileContent,
  generateOpitoCSVFile
} from '@/services'

import usePage from '@/hooks/usePage'
import useApiMessages from '@/hooks/useApiMessages'
import usePagination from '@/hooks/usePagination'

import './opitoFileCard.css'

const Card = ({ item, onView }) => {
  const { name, start, learners, product_code, fileName } = item

  const handleClick = (e) => {
    e.preventDefault()
    onView(item)
  }

  const csvFilePath = `${import.meta.env.VITE_ASSETS_URL}${fileName}`

  return (
    <article className="card opito-files-generator">
      <div className="card-body">
        <div className="product">
          {product_code} {name}
        </div>

        <div className="start">{start}</div>
        <div className="small-font learners">{learners} record(s)</div>
      </div>
      <div className="button-area">
        {fileName && <Link to={csvFilePath}>Download</Link>}
        {!fileName && (
          <button className="button" onClick={handleClick}>
            get file
          </button>
        )}
      </div>
    </article>
  )
}

const OpitoFileGenerate = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({ rows: [], count: 0 })
  const { pagination, setPagination } = usePagination()

  const { set: setPage } = usePage()
  const { apiMessage } = useApiMessages()

  useEffect(() => {
    setPage('Opito Files Generator')
    setIsLoading(true)
    getOpitoFileList(pagination)
      .then((res) => setData(res.data))
      .catch((e) => apiMessage(e))
      .finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  const handleView = (item) => {
    const { id } = item
    const [date, course] = id.split(' ')
    const params = {
      date,
      course: parseInt(course, 10)
    }
    getOpitoFileContent(params)
      .then((res) => {
        const payload = { ...item, records: res.data.rows }
        generateOpitoCSVFile(payload)
          .then((res) => {
            const fileName = res.data.fileName.split('/').pop() // Remove "/" at the beginning of the string

            setData((data) => ({
              ...data,
              rows: data.rows.map((r) => {
                if (r.id === item.id) {
                  return { ...r, fileName }
                }
                return r
              })
            }))
          })
          .catch((e) => {
            console.error(e)
          })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <main className="container">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Opito Generate Files</li>
        </ul>
      </nav>

      <Divider style={{ height: '1rem' }} />

      <CardList
        Card={Card}
        data={data}
        onView={handleView}
        isLoading={isLoading}
        pagination={pagination}
        onPagination={setPagination}
      />
    </main>
  )
}

export default OpitoFileGenerate
