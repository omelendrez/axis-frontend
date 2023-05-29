export const hasRequiredRole = (optionRoles, userRoles) =>
  optionRoles.length === 0 ||
  userRoles
    .map((r) => r.id)
    .join('-')
    .includes(optionRoles)
