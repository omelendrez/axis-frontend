import { roleStatuses } from '@/static-lists'

export const hasRequiredRole = (optionRoles, userRoles) =>
  optionRoles.length === 0 ||
  userRoles
    .map((r) => r.id)
    .join('-')
    .includes(optionRoles)

export const getStatuses = (userRoles) => {
  let statuses = []

  userRoles.forEach((r) => {
    const match = roleStatuses.find((rs) => rs.role === r.id)

    statuses = match ? [...statuses, ...match.statuses] : statuses
  })
  return statuses
}
