import {
  ScanId,
  BloodPressure,
  Print,
  Payment,
  Picture,
  Signature,
  QAApproval,
  MDApproval
} from './actions'
import useUser from '@/hooks/useUser'
import { DOC_TYPE, USER_TYPES } from '@/helpers'

export const Action = ({ training, onUpdate }) => {
  const {
    user: { roles }
  } = useUser()

  const isFrontdesk =
    roles.filter((r) =>
      [USER_TYPES.SYS_ADMIN, USER_TYPES.FRONTDESK].includes(r.id)
    ).length > 0

  const isMedic =
    roles.filter((r) =>
      [USER_TYPES.SYS_ADMIN, USER_TYPES.MEDICAL].includes(r.id)
    ).length > 0

  const isTC =
    roles.filter((r) =>
      [USER_TYPES.SYS_ADMIN, USER_TYPES.TRAINING_COORDINATOR].includes(r.id)
    ).length > 0

  // Instructor

  const isQA =
    roles.filter((r) => [USER_TYPES.SYS_ADMIN, USER_TYPES.QA].includes(r.id))
      .length > 0

  const isFinance =
    roles.filter((r) =>
      [USER_TYPES.SYS_ADMIN, USER_TYPES.FINANCE].includes(r.id)
    ).length > 0

  const isMD =
    roles.filter((r) => [USER_TYPES.SYS_ADMIN, USER_TYPES.MD].includes(r.id))
      .length > 0

  const isPrinter =
    roles.filter((r) =>
      [USER_TYPES.SYS_ADMIN, USER_TYPES.PRINTER].includes(r.id)
    ).length > 0

  return (
    <>
      {isFrontdesk && <ScanId training={training} onUpdate={onUpdate} />}

      {isMedic && <BloodPressure training={training} onUpdate={onUpdate} />}

      {isTC && <Picture training={training} onUpdate={onUpdate} />}

      {isTC && <Signature training={training} onUpdate={onUpdate} />}

      {/* Instructor */}

      {isQA && <QAApproval training={training} onUpdate={onUpdate} />}

      {isFinance && <Payment training={training} onUpdate={onUpdate} />}

      {isMD && <MDApproval training={training} onUpdate={onUpdate} />}

      {isPrinter && <Print training={training} type={DOC_TYPE.CERTIFICATE} />}

      {isPrinter && <Print training={training} type={DOC_TYPE.ID_CARD} />}
    </>
  )
}
