import { roleStatus } from '@/static-lists'
import { ROLES, TRAINING_STATUS } from './constants'

export const hasRequiredRole = (optionRoles, userRoles) =>
  optionRoles.length === 0 ||
  userRoles
    .map((userRole) => userRole.id)
    .join('-')
    .includes(optionRoles)

const matchRoleStatus = (userRoles, status) => {
  let statuses = []
  userRoles.forEach((userRole) => {
    const match = roleStatus.find(
      (roleStatus) => roleStatus.role === userRole.id
    )
    statuses = match ? [...statuses, ...match.statuses] : statuses
  })
  return statuses.includes(status)
}

export const getUserAuth = (componentRole, userRoles, status, tracking) => {
  const isApproved = Boolean(
    tracking.find((t) => t.status_id === componentRole)
  )

  const isCancelled = status === TRAINING_STATUS.CANCELLED

  const isComplete = status === TRAINING_STATUS.COMPLETED

  let canUpdate = null

  switch (componentRole) {
    case ROLES.ADMIN:
    case ROLES.FRONTDESK:
    case ROLES.TRAINING_COORDINATOR:
    case ROLES.PRINTER:
      canUpdate = true
      break
    default:
      canUpdate = false
  }

  const canApprove = matchRoleStatus(userRoles, status)

  const canView =
    status === ROLES.COMPLETED ||
    (matchRoleStatus(userRoles, status) && // User is authorized
      matchRoleStatus([{ id: componentRole }], status)) // Component componentRole is authorized

  return { canView, canApprove, canUpdate, isComplete, isApproved, isCancelled }
}
