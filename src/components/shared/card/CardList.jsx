import { useState } from 'react'
import { Search, Pagination } from '@/components'

import './cardList.css'
import './card.css'

export const CardList = ({
  Card,
  data,
  pagination,
  onPagination,
  fields,
  onEdit,
  onDelete,
  onView,
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
    onPagination((p) => ({ ...p, ...newValues }))
  }

  return (
    <>
      {(data.rows.length > 0 || search.length > 0) && (
        <Search
          onChange={handleSearchChange}
          value={searchText}
          onKeyDown={handleKeyDown}
        />
      )}
      {!isLoading && data?.count === 0 && (
        <article>
          No records found
          {search ? (
            <span style={{ marginLeft: '4px' }}>
              matching <strong> {search}</strong>
            </span>
          ) : (
            ''
          )}
          .
        </article>
      )}
      <div className="card-list">
        {data.rows.map((item) => (
          <Card
            item={item}
            fields={fields}
            key={item.id}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>
      {data.count > 0 && (
        <Pagination
          onPage={handlePageChange}
          page={page}
          limit={limit}
          count={data.count}
        />
      )}
    </>
  )
}
