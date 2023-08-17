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
  MEDIC: 4,
  TRAINING_COORDINATOR: 5,
  ACCOUNTS: 6,
  QA: 7,
  MD: 8,
  PRINTER: 9,
  INSTRUCTOR: 10
}

export const TRAINING_STATUS = {
  NEW: 1,
  ADMIN_DONE: 2,
  FRONTDESK_DONE: 3,
  MEDIC_DONE: 4,
  TRAINING_COORDINATOR_DONE: 5,
  ACCOUNTS_DONE: 6,
  QA_DONE: 7,
  MD_DONE: 8,
  CERT_PRINT_DONE: 9,
  ID_CARD_PRINT_DONE: 10,
  COMPLETED: 11,
  CANCELLED: 12,
  REJECTED: 13
}

export const FUTURE_DAYS = 10 // Number of future days to see in pending tasks view
