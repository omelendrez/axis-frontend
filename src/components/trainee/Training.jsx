import { useEffect, useState } from 'react'
import { getTrainings } from '../../services/api/training'
import { ActionButton } from '../shared'

export const Training = ({ trainee, onEdit, onDelete }) => {
  const [trainings, setTrainings] = useState([])

  useEffect(() => {
    const id = trainee?.id
    if (id) {
      getTrainings(id).then((res) => setTrainings(res.data))
    }
  }, [trainee])

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">Course</th>
          <th scope="col">Start</th>
          <th scope="col">Expiry</th>
          <th scope="col">Certificate</th>
          <th scope="col">Status</th>
          <th scope="col" colSpan={2}></th>
        </tr>
      </thead>
      <tbody>
        {trainings.map((t) => (
          <tr key={t.id}>
            <td>{t.course}</td>
            <td>{t.start}</td>
            <td>{t.expiry}</td>
            <td>{t.certificate}</td>
            <td>{t.status}</td>

            <td className="action-cell">
              <ActionButton
                label="edit"
                className="primary small"
                onClick={() => onEdit(t)}
              />
            </td>

            <td className="action-cell">
              <ActionButton
                label="remove_circle_outline"
                className="delete small"
                onClick={() => onDelete(t)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
