import { useState } from 'react'
import { Search, Pagination, Confirm } from '@/components'
import { RowView } from './RowView'
import useConfirm from '@/hooks/useConfirm'
import './listView.css'

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

  const { isConfirmOpen, confirmMessage, setMessage, closeConfirm } =
    useConfirm()

  const [selectedItem, setSelectedItem] = useState()

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onPagination((p) => ({ ...p, search: searchText, page: 1, offset: 0 }))
    }
  }

  const handleSearchChange = (e) => setSearchText(e.target.value)

  const handlePageChange = (value) => {
    const { page, limit } = { ...pagination }

    const newPage = page + value

    onPagination((p) => ({
      ...p,
      page: newPage,
      offset: (newPage - 1) * limit
    }))
  }

  const handleDelete = (row) => {
    setSelectedItem(row)

    const item = data.rows.find((t) => t.id === row.id)

    const message = (
      <span>
        Are you sure you want to delete{' '}
        <span className="primary">{Object.values(item)[1]}</span>?
      </span>
    )

    setMessage(message)
  }

  const handleDeleteConfirm = (e) => {
    e.preventDefault()

    onDelete(selectedItem)

    closeConfirm()
  }

  const handleCancel = (e) => {
    e.preventDefault()

    closeConfirm()
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
              {fields.map((f) => {
                let style = {}
                if (f.center) {
                  style = { ...style, textAlign: 'center' }
                }

                if (f.right) {
                  style = { ...style, textAlign: 'right' }
                }
                return (
                  <th key={f.name} scope="col" style={style}>
                    {f.label}
                  </th>
                )
              })}
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!isLoading && data?.count === 0 && (
              <tr>
                <td colSpan={fields.length + 1}>
                  <article>
                    No records found
                    {search ? (
                      <span style={{ marginLeft: '6px' }}>
                        matching <code>{search}</code>
                      </span>
                    ) : null}
                  </article>
                </td>
              </tr>
            )}

            {data.rows.map((item) => (
              <RowView
                item={item}
                fields={fields}
                key={item.id}
                onEdit={onEdit}
                onDelete={handleDelete}
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
      <Confirm
        open={isConfirmOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleCancel}
        message={confirmMessage}
      />
    </main>
  )
}
