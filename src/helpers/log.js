const colors = {
  error: 'background:red;color:white;',
  info: 'background:blue;color:white;',
  success: 'background:green;color:white;',
  warning: 'background:orange;color:black;'
}

const set = (styles) => (message) =>
  console.log(
    `%c ${
      typeof message === 'object' ? JSON.stringify(message, null, 2) : message
    }`,
    styles
  )

export const log = {
  error: set(colors.error),
  info: set(colors.info),
  success: set(colors.success),
  warning: set(colors.warning)
}
