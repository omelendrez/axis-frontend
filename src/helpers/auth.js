export const hasRequiredRole = (roles, user) =>
  roles.length === 0 ||
  user.roles
    .map((r) => r.id)
    .join('-')
    .includes(roles)
