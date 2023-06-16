import { api } from './apiClient'

import { APPROVAL_STATUS } from '../../helpers/constants'

const endpoint = '/approval'

// Generic approval
export const approvals = ({ id, status, payload }) =>
  api.post(`${endpoint}/${id}/${status}`, payload)

// Undo approvals
export const undoLastApproval = (id) => api.delete(`${endpoint}/${id}`)

// 2 Frontdesk
export const frontdeskApproval = (id) =>
  approvals({
    id,
    status: APPROVAL_STATUS.FRONTDESK
  })

// 3 Medical
export const medicalApproval = (id, payload) =>
  approvals({
    id,
    status: APPROVAL_STATUS.MEDICAL,
    payload
  })

// 4 Training Coordinator
export const trainingCoordinatorApproval = (id) =>
  approvals({
    id,
    status: APPROVAL_STATUS.TRAINING_COORDINATOR
  })

// 5 Assesment
export const assesmentApproval = (id, payload) =>
  approvals({
    id,
    status: APPROVAL_STATUS.ASSESSMENT,
    payload
  })

// 6 QA
export const QAApproval = (id) =>
  approvals({
    id,
    status: APPROVAL_STATUS.QA
  })

// 7 Finance
export const financeApproval = (id, payload) =>
  approvals({
    id,
    status: APPROVAL_STATUS.FINANCE,
    payload
  })

// 8 MD
export const MDApproval = (id) =>
  approvals({
    id,
    status: APPROVAL_STATUS.MD
  })
