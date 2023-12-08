import { useEffect, useState } from 'react'
import { StatusSwitcher } from '..'

import { Divider } from '@/components/shared'

export const InputStatus = ({ statuses, onChange, selected, setSelected }) => {
  const [allSelected, setAllSelected] = useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    setSelected(allSelected ? [] : statuses.map((s) => s.id))
  }

  useEffect(() => {
    setAllSelected(statuses.length === selected.length)
  }, [statuses, selected])

  return (
    <section className="pending-tasks-statuses">
      <h6>Status to include</h6>
      <div
        className="pending-tasks-status-switch select-unselect"
        key="select-unselect"
      >
        <input
          type="checkbox"
          id="select-unselect"
          role="switch"
          onChange={handleChange}
          checked={allSelected}
        />
        <label htmlFor="select-unselect" className="select-unselect">
          {allSelected ? 'Select None' : 'Select All'}
        </label>
      </div>
      <Divider style={{ margin: '.3rem 0' }} />
      {statuses.map((status) => (
        <StatusSwitcher
          key={status.id}
          id={status.id}
          label={status.status}
          value={selected.includes(status.id) ? 1 : 0}
          onChange={onChange}
        />
      ))}
    </section>
  )
}
