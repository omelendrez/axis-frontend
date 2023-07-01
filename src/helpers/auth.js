import { roleStatus } from '@/static-lists'
import { TRAINING_STATUS } from './constants'

export const hasRequiredRole = (optionRoles, userRoles) =>
  optionRoles.length === 0 ||
  userRoles
    .map((r) => r.id)
    .join('-')
    .includes(optionRoles)

const matchStatuses = (userRoles, status) => {
  let statuses = []
  userRoles.forEach((r) => {
    const match = roleStatus.find((rs) => rs.role === r.id)
    statuses = match ? [...statuses, ...match.statuses] : statuses
  })
  return statuses.includes(status)
}

export const getUserAuth = (role, userRoles, status, tracking) => {
  const isApproved = Boolean(tracking.find((t) => t.status_id === role))

  const isCancelled = status === TRAINING_STATUS.CANCELLED

  const isComplete = status === TRAINING_STATUS.COMPLETED

  let canUpdate = null

  switch (role) {
    case TRAINING_STATUS.ADMIN:
    case TRAINING_STATUS.FRONTDESK:
    case TRAINING_STATUS.TRAINING_COORDINATOR:
    case TRAINING_STATUS.CERT_PRINT:
    case TRAINING_STATUS.ID_CARD_PRINT:
      canUpdate = true
      break
    default:
      canUpdate = false
  }

  const canApprove = role === status

  const canView =
    status === TRAINING_STATUS.COMPLETED ||
    (matchStatuses(userRoles, status) && role <= status)

  return { canView, canApprove, canUpdate, isComplete, isApproved, isCancelled }
}
