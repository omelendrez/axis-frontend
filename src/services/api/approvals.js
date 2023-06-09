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
    status: TRAINING_STATUS.ADMIN,
    payload
  })

// 2 Frontdesk
export const frontdeskApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.FRONTDESK,
    payload
  })

// 3 Medical
export const medicalApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.MEDICAL,
    payload
  })

// 4 Training Coordinator
export const trainingCoordinatorApproval = (id) =>
  approvals({
    id,
    status: TRAINING_STATUS.TRAINING_COORDINATOR
  })

// 5 Assessment
export const assessmentApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.ASSESSMENT,
    payload
  })

// 6 QA
export const QAApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.QA,
    payload
  })

// 7 Finance
export const financeApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.FINANCE,
    payload
  })

// 8 MD
export const MDApproval = (id, payload) =>
  approvals({
    id,
    status: TRAINING_STATUS.MD,
    payload
  })
