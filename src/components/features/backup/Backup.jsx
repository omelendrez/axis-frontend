import { useState } from 'react'
import { Button, Divider } from '@/components/shared'
import options from './options.json'
import useApiMessages from '@/hooks/useApiMessages'
import backup from '@/services/api/backup'
import './backup.css'

const BackupButton = ({ option, isSubmitting, onClick, current }) => (
  <Button
    key={option.id}
    id={option.id}
    disabled={isSubmitting || option.disabled}
    onClick={onClick}
    aria-busy={current === option.id}
  >
    {option.label}
  </Button>
)

export const Backup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { apiMessage } = useApiMessages()

  const [current, setCurrent] = useState()

  const handleClick = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setCurrent(e.target.id)

    const execute = backup[e.target.id]

    execute()
      .then((res) => {
        setIsSubmitting(false)
        setCurrent(null)
        apiMessage(res)
      })
      .catch((err) => {
        setIsSubmitting(false)
        setCurrent(null)
        apiMessage(err)
      })
  }

  return (
    <main className="backup">
      <section className="backup-container">
        {options.backup.map((o) => (
          <BackupButton
            option={o}
            isSubmitting={isSubmitting}
            onClick={handleClick}
            current={current}
            key={o.id}
          />
        ))}
      </section>
      <Divider />
      <section className="backup-container">
        {options.restore.map((o) => (
          <BackupButton
            option={o}
            isSubmitting={isSubmitting}
            onClick={handleClick}
            current={current}
            key={o.id}
          />
        ))}
      </section>
    </main>
  )
}
