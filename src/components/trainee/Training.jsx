import { useEffect, useState } from 'react'
import { getTrainings } from '../../services'
import { ActionButton, AddButton } from '../shared'
import './training.css'

const isMobile = window.innerWidth < 992

export const Training = ({ trainee, onAdd, onEdit, onDelete, noMobile }) => {
  const [trainings, setTrainings] = useState([])

  const isReadOnly = isMobile && noMobile

  useEffect(() => {
    const id = trainee?.id
    if (id) {
      getTrainings(id).then((res) => setTrainings(res.data))
    }
  }, [trainee])

  return (
    <div className="training-table-container">
      <table>
        <thead>
          <tr>
            <th scope="col">Course</th>
            <th scope="col">Start</th>
            <th scope="col">Expiry</th>
            <th scope="col">Certificate</th>
            <th scope="col">Status</th>
            {!isReadOnly && <th scope="col" colSpan={2}></th>}
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

              {!isReadOnly && (
                <>
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
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {!isReadOnly && <AddButton url="/training" onClick={onAdd} />}
    </div>
  )
}
