import { roleStatuses } from '@/static-lists'
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
    const match = roleStatuses.find((rs) => rs.role === r.id)
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
    case TRAINING_STATUS.FRONTDESK:
    case TRAINING_STATUS.TRAINING_COORDINATOR:
    case TRAINING_STATUS.CERT_PRINT:
    case TRAINING_STATUS.ID_CARD_PRINT:
      canUpdate = true
      break
    default:
      canUpdate = false
  }

  const canView = matchStatuses(userRoles, status)

  return { canView, canUpdate, isComplete, isApproved, isCancelled }
}
