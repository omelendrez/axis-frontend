import { useState } from 'react'
import useUser from '../../../hooks/useUser'
import { ActionButton, Search } from '../'

const Row = ({ item, fields, onEdit, onDelete }) => {
  const { user } = useUser()
  let isLocked = false
  fields.forEach((f) => {
    const lock = f.lock
    if (lock) {
      if (item[lock.field] === lock.value) {
        isLocked = true
      }
    }
  })

  return (
    <tr>
      {fields.map((f) => {
        let style = {}

        if (f.noWrap) {
          style = { ...style, whiteSpace: 'nowrap' }
        }

        if (f.ellipsis) {
          style = {
            ...style,
            maxWidth: f.maxWidth,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        }

        return (
          <td key={f.name} style={style}>
            {item[f.name]}
          </td>
        )
      })}

      <td className="action-cell">
        <ActionButton
          label="Edit"
          className="primary"
          disabled={user.role !== 1 || isLocked}
          onClick={() => onEdit(item)}
        />
      </td>

      <td className="action-cell">
        <ActionButton
          label="Delete"
          className="secondary"
          disabled={user.role !== 1 || isLocked}
          onClick={() => onDelete(item)}
        />
      </td>
    </tr>
  )
}

export const ListView = ({
  loadItems,
  items,
  fields,
  onEdit,
  onDelete,
  isLoading
}) => {
  const [search, setSearch] = useState('')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      loadItems(search)
    }
  }

  return (
    <main className="container-fluid">
      <Search
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyDown={handleKeyDown}
      />
      <figure>
        <table role="grid">
          <thead>
            <tr>
              {fields.map((f) => (
                <th key={f.name} scope="col">
                  {f.label}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!isLoading && items.length === 0 && (
              <tr>
                <td colSpan={4}>
                  <article>No records found</article>
                </td>
              </tr>
            )}

            {items.map((item) => (
              <Row
                item={item}
                fields={fields}
                key={item.id}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </figure>
    </main>
  )
}
