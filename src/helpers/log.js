const styles = {
  error: 'background:#d32f2f;color:#ffffff;padding:3px;',
  info: 'background:#0288d1;color:#ffffff;padding:3px;',
  success: 'background:#388e3c;color:#ffffff;padding:3px;',
  warning: 'background:#f57c00;color:#ffffff;padding:3px;'
}

const set = (style) => (m) => console.log('%c %o', style, m)

export const log = {
  error: set(styles.error),
  info: set(styles.info),
  success: set(styles.success),
  warning: set(styles.warning)
}
