import { useEffect, useState } from 'react'
import { getContactInfos } from '../../services'
import { ActionButton, AddButton } from '../shared'
import './training.css'

export const ContactInfo = ({ trainee, onAdd, onEdit, onDelete }) => {
  const [contactInfos, setContactInfos] = useState([])

  useEffect(() => {
    const id = trainee?.id
    if (id) {
      getContactInfos(id).then((res) => setContactInfos(res.data))
    }
  }, [trainee])

  return (
    <div className="training-table-container">
      <table>
        <thead>
          <tr>
            <th scope="col">Contact type</th>
            <th scope="col">Info</th>
            <th scope="col" colSpan={2}></th>
          </tr>
        </thead>
        <tbody>
          {contactInfos.map((i) => (
            <tr key={i.id}>
              <td>{i.type}</td>
              <td>{i.value}</td>

              <td className="action-cell">
                <ActionButton
                  label="edit"
                  className="primary small"
                  onClick={() => onEdit(i)}
                />
              </td>

              <td className="action-cell">
                <ActionButton
                  label="remove_circle_outline"
                  className="delete small"
                  onClick={() => onDelete(i)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddButton url="/contact-info" onClick={onAdd} />
    </div>
  )
}
