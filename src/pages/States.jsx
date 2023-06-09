import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, ListView, AddButton } from '../components'

import useStates from '../hooks/useStates'
import useNotification from '../hooks/useNotification'

import { initialValues, FOREIGNER } from '../helpers'

const States = () => {
  const { states, load: loadStates, remove: removeState } = useStates()
  const { data, isLoading, isSuccess, isError, error, isFirstLoad } = states

  const [pagination, setPagination] = useState(initialValues)

  const navigate = useNavigate()
  const { set } = useNotification()

  useEffect(() => {
    loadStates(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    if (isFirstLoad) {
      loadStates(pagination)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstLoad])

  useEffect(() => {
    if (isError) {
      const notification = {
        type: 'error',
        message: error.message
      }
      set(notification)
    }
    if (isSuccess) {
      const notification = {
        type: 'success',
        message: 'Operation completed successfully'
      }
      set(notification)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, isSuccess])

  const handleEdit = (state) => {
    navigate(`/state/${state.id}`)
  }

  const handleDelete = (state) => {
    removeState(state.id)
  }

  const fields = [
    {
      name: 'name',
      id: 'Name',
      lock: { values: [FOREIGNER] }
    }
  ]

  return (
    <main className="container">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Menu</Link>
          </li>
          <li>States</li>
        </ul>
      </nav>
      <AddButton url="/state" />

      <ListView
        data={data}
        pagination={pagination}
        onPagination={setPagination}
        fields={fields}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
        loadItems={loadStates}
      />
    </main>
  )
}

export default States
