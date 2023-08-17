import { api } from './apiClient'

import { TRAINING_STATUS } from '@/helpers'

const endpoint = '/approval'

// Generic approval
export const approvals = ({ id, status, payload }) =>
  api.post(`${endpoint}/${id}/${status}`, payload)

// Undo approvals
export const undoLastApproval = (id) => api.delete(`${endpoint}/${id}`)

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

// 6 QA
export const QAApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.QA_DONE,
    payload
  })

// 7 Accounts
export const accountsApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.ACCOUNTS_DONE,
    payload
  })

// 8 MD
export const MDApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.MD_DONE,
    payload
  })
