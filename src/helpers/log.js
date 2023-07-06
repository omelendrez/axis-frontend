const styles = {
  error: 'background:#d32f2f;color:#ffffff;',
  info: 'background:#0288d1;color:#ffffff;',
  success: 'background:#388e3c;color:#ffffff;',
  warning: 'background:#f57c00;color:#ffffff;'
}

const set = (style) => (m) => {
  if (typeof m === 'object') {
    return console.log(`%c___`, style, `\n${JSON.stringify(m, null, 2)}`)
  }

  if (typeof m === 'string') {
    return console.log(`%c ${m} `, style)
  }
}

export const log = {
  error: set(styles.error),
  info: set(styles.info),
  success: set(styles.success),
  warning: set(styles.warning)
}
