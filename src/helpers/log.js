const styles = {
  error: 'background:#d32f2f;color:#ffffff;padding: 3px;',
  info: 'background:#0288d1;color:#ffffff;padding: 3px;',
  success: 'background:#388e3c;color:#ffffff;padding: 3px;',
  warning: 'background:#f57c00;color:#ffffff;padding: 3px;'
}

function set(style) {
  return function (...args) {
    args.forEach((param) => {
      switch (typeof param) {
        case 'string':
          console.log(`%c${param} `, style)
          break
        case 'object':
          console.log(`%c`, style, `\n${JSON.stringify(param, null, 2)}`)
          break
        default:
          console.log('Invalid typeof', typeof param, param)
      }
    })
  }
}

export const log = {
  error: set(styles.error),
  info: set(styles.info),
  success: set(styles.success),
  warning: set(styles.warning)
}
