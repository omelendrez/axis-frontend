import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TableButtonRow, Loading, ListView } from '../components'

import useStates from '../hooks/useStates'
import useNotification from '../hooks/useNotification'

const States = () => {
  const { states, load: loadStates, remove: removeState } = useStates()
  const { data, isLoading, isSuccess, isError, error } = states

  const navigate = useNavigate()
  const { set } = useNotification()

  useEffect(() => {
    loadStates()
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

  const fields = [{ name: 'name', id: 'Name' }]

  return (
    <main className="container-fluid">
      {isLoading && <Loading />}
      <nav aria-label="breadcrumb" className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>States</li>
        </ul>
      </nav>
      <TableButtonRow url="/state" label="Add state" />

      <ListView
        items={data}
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
