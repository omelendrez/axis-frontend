import { useEffect, useState } from 'react'
import { Table, Buttons, Divider } from '@/components'
import useApiMessages from '@/hooks/useApiMessages'
import useNotification from '@/hooks/useNotification'
import './multiselect.css'

export const Multiselect = ({ id, fields, items, onClose, onSave }) => {
  const { apiMessage } = useApiMessages()

  const { set } = useNotification()

  const [selected, setSelected] = useState([])

  useEffect(() => {
    const filtered = selected.filter((s) => items.find((t) => t.id === s))
    setSelected(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  const handleSelect = (e) => {
    const { checked, value } = e.target
    setSelected((selected) =>
      checked ? [...selected, value] : selected.filter((s) => s !== value)
    )
  }

  const handleSaveRoles = (e) => {
    e.preventDefault()

    if (!selected.length) {
      const notification = {
        type: 'error',
        message: 'No items selected'
      }
      return set(notification)
    }

    const payload = selected.map((i) => [id, parseInt(i, 10)])

    onSave([payload])
      .then((res) => {
        setSelected([])
        onClose()
        const notification = {
          type: 'success',
          message: 'Operation completed successfully'
        }
        set(notification)
      })
      .catch((e) => apiMessage(e))
  }

  return (
    <article className="multiselect-view">
      <Buttons selected={selected} onSave={handleSaveRoles} noCheckboxes />
      <Divider style={{ margin: '1rem 0' }} />

      <Table
        items={items}
        fields={fields}
        selected={selected}
        onSelect={handleSelect}
      />
    </article>
  )
}
