import { useState } from 'react'
import useUser from '../../../hooks/useUser'
import { ActionButton, Search } from '../'
import { Pagination } from '../'

const Row = ({ item, fields, onEdit, onDelete }) => {
  const { user } = useUser()
  let isLocked = false
  fields.forEach((f) => {
    const lock = f.lock
    if (lock) {
      if (lock.values.includes(item[f.name])) {
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

        if (f.maxWidth) {
          style = {
            ...style,
            maxWidth: f.maxWidth
          }
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
          label="edit"
          className="primary"
          tooltip="Click to Edit"
          disabled={user.role !== 1 || isLocked}
          onClick={() => onEdit(item)}
        />

        <ActionButton
          label="remove_circle_outline"
          className="delete"
          tooltip="Click to Delete"
          disabled={user.role !== 1 || isLocked}
          onClick={() => onDelete(item)}
        />
      </td>
    </tr>
  )
}

export const ListView = ({
  data,
  pagination,
  onPagination,
  fields,
  onEdit,
  onDelete,
  isLoading
}) => {
  const [searchText, setSearchText] = useState('')
  const { page, limit, search } = pagination

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onPagination((p) => ({ ...p, search: searchText, page: 1, offset: 0 }))
    }
  }

  const handleSearchChange = (e) => setSearchText(e.target.value)

  const handlePageChange = (value) => {
    const { page, limit } = { ...pagination }
    const newPage = page + value
    const newValues = {
      page: newPage,
      offset: (newPage - 1) * limit
    }
    onPagination((p) => {
      return { ...p, ...newValues }
    })
  }

  return (
    <main className="container-fluid list-view">
      <Search
        onChange={handleSearchChange}
        value={searchText}
        onKeyDown={handleKeyDown}
      />

      <figure>
        <table role="grid" className="list-view-table">
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
            {!isLoading && data?.count === 0 && (
              <tr>
                <td colSpan={fields.length + 1}>
                  <article>
                    No records found
                    {search ? ` matching: "${search}"` : ''}.
                  </article>
                </td>
              </tr>
            )}

            {data.rows.map((item) => (
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
      {data.count > 0 && (
        <Pagination
          onPage={handlePageChange}
          page={page}
          limit={limit}
          count={data.count}
        />
      )}
    </main>
  )
}
