import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loading, ListView, AddButton } from '@/components'

import useStates from '@/hooks/useStates'
import useNotification from '@/hooks/useNotification'

import { FOREIGNER } from '@/helpers'
import usePagination from '@/hooks/usePagination'

const States = () => {
  const { states, load: loadStates, remove: removeState } = useStates()
  const { data, isLoading, isSuccess, isError, error } = states

  const { pagination, setPagination } = usePagination()

  const navigate = useNavigate()
  const { set } = useNotification()

  useEffect(() => {
    loadStates(pagination)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination])

  useEffect(() => {
    loadStates(pagination)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
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
      />
    </main>
  )
}

export default States
