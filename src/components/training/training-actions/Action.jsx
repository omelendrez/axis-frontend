import { ScanId, BloodPressure, Print, Payment } from './actions'
import useUser from '@/hooks/useUser'
import { DOC_TYPE, USER_TYPES } from '@/helpers'
import { TakePicture } from './actions/photo'

export const Action = ({ training, onUpdate }) => {
  const {
    user: { roles }
  } = useUser()

  const isAdmin =
    roles.filter((r) => [USER_TYPES.SYS_ADMIN, USER_TYPES.ADMIN].includes(r.id))
      .length > 0

  const isFinance =
    roles.filter((r) =>
      [USER_TYPES.SYS_ADMIN, USER_TYPES.FINANCE].includes(r.id)
    ).length > 0

  const isTrainingCoordinator =
    roles.filter((r) =>
      [USER_TYPES.SYS_ADMIN, USER_TYPES.TRAINING_COORDINATOR].includes(r.id)
    ).length > 0

  const isMedic =
    roles.filter((r) =>
      [USER_TYPES.SYS_ADMIN, USER_TYPES.MEDICAL].includes(r.id)
    ).length > 0

  const isPrinter =
    roles.filter((r) =>
      [USER_TYPES.SYS_ADMIN, USER_TYPES.PRINTER].includes(r.id)
    ).length > 0

  return (
    <>
      {isAdmin && <ScanId training={training} onUpdate={onUpdate} />}

      {isMedic && <BloodPressure training={training} onUpdate={onUpdate} />}

      {isFinance && <Payment training={training} onUpdate={onUpdate} />}

      {isTrainingCoordinator && (
        <TakePicture training={training} onUpdate={onUpdate} />
      )}

      {isPrinter && <Print training={training} type={DOC_TYPE.CERTIFICATE} />}

      {isPrinter && <Print training={training} type={DOC_TYPE.ID_CARD} />}
    </>
  )
}
