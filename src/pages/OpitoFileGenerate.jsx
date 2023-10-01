import { useEffect, useState } from 'react'

import { CardList, Divider, Loading } from '@/components'

import { getOpitoFileList, getOpitoFileContent } from '@/services'

import usePage from '@/hooks/usePage'
import useApiMessages from '@/hooks/useApiMessages'

import { initialValues } from '@/helpers'
import './opitoFileCard.css'

const Card = ({ item, onView }) => {
  const { name, start, learners, product_code } = item

  const handleClick = (e) => {
    e.preventDefault()
    onView(item)
  }
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
        <button className="button" onClick={handleClick}>
          GENERATE
        </button>
      </div>
    </article>
  )
}

const OpitoFileGenerate = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({ rows: [], count: 0 })
  const [pagination, setPagination] = useState(initialValues)

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
    console.log(item)
    const { id } = item
    const [date, course] = id.split(' ')
    const params = {
      date,
      course: parseInt(course, 10)
    }
    getOpitoFileContent(params)
      .then((res) => {
        console.log(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <main className="container">
      {isLoading && <Loading />}

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
