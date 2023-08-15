import { roleStatus } from '@/static-lists'
import { USER_ROLE, TRAINING_STATUS } from './constants'
import { log } from './log'

export const hasRequiredRole = (optionRoles, userRoles) =>
  optionRoles.length === 0 ||
  Boolean(optionRoles.find((r) => userRoles.find((ur) => ur.id === r)))

export const matchRoleStatus = (userRoles, status) => {
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
  // if (componentRole !== USER_ROLE.FINANCE) {
  //   log.info('getUserAuth', { componentRole, userRoles, status, tracking })
  // }

  const isApproved = tracking.map((t) => t.status_id).includes(componentRole)

  const isCancelled = status === TRAINING_STATUS.CANCELLED

  const isRejected = status === TRAINING_STATUS.REJECTED

  const isComplete = status === TRAINING_STATUS.COMPLETED

  const canView =
    isComplete ||
    isApproved ||
    isCancelled ||
    isRejected ||
    matchRoleStatus([{ id: componentRole }], status)

  const canApprove = matchRoleStatus(userRoles, status) && !isApproved

  const canUpdate = matchRoleStatus(userRoles, status)

  // if (componentRole === USER_ROLE.FINANCE) {
  //   log.info({
  //     canView,
  //     canApprove,
  //     canUpdate,
  //     isComplete,
  //     isApproved,
  //     isCancelled,
  //     isRejected
  //   })
  // }

  return {
    canView,
    canApprove,
    canUpdate,
    isComplete,
    isApproved,
    isCancelled,
    isRejected
  }
}
