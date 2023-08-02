export const FOREIGNER = '- Foreigner -'

export const CERT_TYPE = {
  STANDARD: 1,
  NIMASA: 2,
  FORKLIFT: 3,
  OPITO: 4
}

export const DOC_TYPE = {
  CERTIFICATE: 1,
  ID_CARD: 2
}

export const USER_ROLE = {
  SYS_ADMIN: 1,
  ADMIN: 2,
  FRONTDESK: 3,
  FINANCE: 4,
  MEDICAL: 5,
  TRAINING_COORDINATOR: 6,
  ASSESSMENT: 7,
  QA: 8,
  MD: 9,
  PRINTER: 10
}

export const TRAINING_STATUS = {
  NEW: 1,
  ADMIN: 2,
  FRONTDESK: 3,
  MEDICAL: 4,
  TRAINING_COORDINATOR: 5,
  ASSESSMENT: 6,
  QA: 7,
  FINANCE: 8,
  MD: 9,
  CERT_PRINT: 10,
  ID_CARD_PRINT: 11,
  COMPLETED: 12,
  CANCELLED: 13,
  REJECTED: 14
}

export const FUTURE_DAYS = 10 // Number of future days to see in pending tasks view
