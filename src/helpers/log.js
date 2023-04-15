function createConsoleMessage(styles) {
  return (message) =>
    console.log(`%c ${typeof message === 'object'
      ? JSON.stringify(message, null, 2)
      : message}`,
      styles);
}

export const log = {
  error: createConsoleMessage('background:red;color:white;'),
  info: createConsoleMessage('background:blue;color:white;'),
  success: createConsoleMessage('background:green;color:white;'),
  warning: createConsoleMessage('background:orange;color:black;')
};
