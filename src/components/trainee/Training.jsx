import { useEffect, useState } from 'react'
import { getTrainings } from '../../services'
import { ActionButton, AddButton } from '../shared'
import './training.css'

export const Training = ({ trainee, onAdd, onEdit, onDelete, noMobile }) => {
  const [trainings, setTrainings] = useState([])
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const isMobile = windowWidth < 992

  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const id = trainee?.id
    if (id) {
      getTrainings(id).then((res) => setTrainings(res.data))
    }
  }, [trainee])

  const isReadOnly = isMobile && noMobile

  return (
    <div className="training-table-container">
      <table>
        <thead>
          <tr>
            <th scope="col">Course</th>
            <th scope="col">Status</th>
            {!isReadOnly && (
              <>
                <th scope="col">Start</th>
                <th scope="col">Expiry</th>
                <th scope="col">Certificate</th>
                <th scope="col" colSpan={2}></th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {trainings.map((t) => (
            <tr key={t.id}>
              <td>{t.course}</td>
              <td>{t.status}</td>
              {!isReadOnly && (
                <>
                  <td>{t.start}</td>
                  <td>{t.expiry}</td>
                  <td>{t.certificate}</td>
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
