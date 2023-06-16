import { ScanId, BloodPressure, Print, Payment } from './actions'
import useUser from '../../../hooks/useUser'
import { DOC_TYPE, USER_TYPES } from '../../../helpers'

export const Action = ({ training, onUpdate }) => {
  const {
    user: { roles }
  } = useUser()

  const isAdmin = roles.includes(USER_TYPES.ADMIN, USER_TYPES.SYS_ADMIN)

  const isFinance = roles.includes(USER_TYPES.FINANCE, USER_TYPES.SYS_ADMIN)

  const isMedic = roles.includes(USER_TYPES.MEDICAL, USER_TYPES.SYS_ADMIN)

  const isPrinter = roles.includes(USER_TYPES.PRINTER, USER_TYPES.SYS_ADMIN)

  return (
    <>
      {isAdmin && <ScanId training={training} />}

      {isFinance && <Payment training={training} onUpdate={onUpdate} />}

      {isMedic && <BloodPressure training={training} />}

      {isPrinter && <Print training={training} type={DOC_TYPE.CERTIFICATE} />}

      {isPrinter && <Print training={training} type={DOC_TYPE.ID_CARD} />}
    </>
  )
}
