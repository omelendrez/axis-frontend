import { useState } from 'react'
import useUser from '../../hooks/useUser'
import { ActionButton, Search } from '../shared'

const Row = ({ nationality, onEdit, onDelete }) => {
  const { user } = useUser()
  return (
    <tr>
      <td>{nationality.code}</td>
      <td>{nationality.country}</td>
      <td>{nationality.nationality}</td>
      <td className="action-cell">
        <ActionButton
          label="Edit"
          className="primary"
          disabled={user.role !== 1}
          onClick={() => onEdit(nationality)}
        />
      </td>
      {user.role === 1 && (
        <td className="action-cell">
          <ActionButton
            label="Delete"
            className="secondary"
            disabled={user.role !== 1}
            onClick={() => onDelete(nationality)}
          />
        </td>
      )}
    </tr>
  )
}

export const Nationalities = ({
  loadNationalities,
  nationalities,
  onEdit,
  onDelete,
  isLoading
}) => {
  const [search, setSearch] = useState('')

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      loadNationalities(search)
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
              <th scope="col">Name</th>
              <th scope="col">Country</th>
              <th scope="col">Nationality</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {!isLoading && nationalities.length === 0 && (
              <tr>
                <td colSpan={3}>
                  <article>No records found</article>
                </td>
              </tr>
            )}

            {nationalities.map((nationality) => (
              <Row
                nationality={nationality}
                key={nationality.id}
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
