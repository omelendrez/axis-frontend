import { roleStatus } from '@/static-lists'
import { TRAINING_STATUS } from './constants'

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
  // if (componentRole === ROLES.ADMIN) {
  //   console.log(
  //     JSON.stringify({ componentRole, userRoles, status, tracking }, null, 2)
  //   )
  // }

  const isApproved = tracking.map((t) => t.status_id).includes(componentRole)

  const isCancelled = status === TRAINING_STATUS.CANCELLED

  const isComplete = status === TRAINING_STATUS.COMPLETED

  const canView =
    isComplete ||
    isApproved ||
    isCancelled ||
    matchRoleStatus([{ id: componentRole }], status)

  const canApprove = matchRoleStatus(userRoles, status) && !isApproved

  const canUpdate = matchRoleStatus(userRoles, status)

  // if (componentRole === ROLES.ADMIN) {
  //   console.log(
  //     JSON.stringify(
  //       { canView, canApprove, canUpdate, isComplete, isApproved, isCancelled },
  //       null,
  //       2
  //     )
  //   )
  // }

  return { canView, canApprove, canUpdate, isComplete, isApproved, isCancelled }
}
