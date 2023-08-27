import { api } from './apiClient'

import { TRAINING_STATUS } from '@/helpers'

const endpoint = '/approval'

export const saveReason = (id, payload) =>
  api.post(`${endpoint}/${id}/reason`, payload)

// Generic approval
export const approvals = ({ id, status, payload }) =>
  api.post(`${endpoint}/${id}/${status}`, payload)

// Undo approvals
export const undoLastApproval = (id) => api.delete(`${endpoint}/${id}`)

// Cancel
export const cancelTraining = (id) =>
  approvals({
    id,
    status: TRAINING_STATUS.CANCELLED
  })

// 1 Admin
export const adminApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.ADMIN_DONE,
    payload
  })

// 2 Frontdesk
export const frontdeskApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.FRONTDESK_DONE,
    payload
  })

// 3 Medical
export const medicalApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.MEDIC_DONE,
    payload
  })

// 4 Training Coordinator
export const trainingCoordinatorApproval = (id) =>
  approvals({
    id,
    status: TRAINING_STATUS.TRAINING_COORDINATOR_DONE
  })

// 5 Assessment

// 5 Accounts
export const accountsApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.ACCOUNTS_DONE,
    payload
  })

// 6 QA
export const QAApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.QA_DONE,
    payload
  })

// 7 MD
export const MDApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.MD_DONE,
    payload
  })

// 8 Cert Print
export const certificatePrintDone = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.CERT_PRINT_DONE,
    payload
  })

// 9 ID Card Print
export const idCardPrintDone = (id) =>
  approvals({
    id,
    status: TRAINING_STATUS.ID_CARD_PRINT_DONE
  })
