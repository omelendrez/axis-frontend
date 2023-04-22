import { useState } from 'react'
import useUser from '../../hooks/useUser'
import { ActionButton, Search } from '../shared'

const Row = ({ company, onEdit, onDelete }) => {
  const { user } = useUser()
  return (
    <tr>
      <td>{company.code}</td>
      <td>{company.name}</td>

      <td className="action-cell">
        <ActionButton
          label="Edit"
          className="primary"
          disabled={user.role !== 1}
          onClick={() => onEdit(company)}
        />
      </td>
      {user.role === 1 && (
        <td className="action-cell">
          <ActionButton
            label="Delete"
            className="secondary"
            disabled={user.role !== 1}
            onClick={() => onDelete(company)}
          />
        </td>
      )}
    </tr>
  )
}

export const Companies = ({
  loadCompanies,
  companies,
  onEdit,
  onDelete,
  isLoading
}) => {
  const [search, setSearch] = useState('')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      loadCompanies(search)
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
              <th scope="col">Code</th>
              <th scope="col">Name</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!isLoading && companies.length === 0 && (
              <tr>
                <td colSpan={4}>
                  <article>No records found</article>
                </td>
              </tr>
            )}

            {companies.map((company) => (
              <Row
                company={company}
                key={company.id}
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
