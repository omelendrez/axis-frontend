import {
  ScanId,
  Medical,
  Print,
  Payment,
  Picture,
  Signature,
  QAApproval,
  MDApproval
} from './actions'

import useUser from '@/hooks/useUser'

import { DOC_TYPE, TRAINING_STATUS } from '@/helpers'

export const Action = ({ training, onUpdate }) => {
  const { user } = useUser()
  const props = {
    training,
    onUpdate,
    user
  }

  return (
    <>
      <ScanId {...props} role={TRAINING_STATUS.FRONTDESK} />
      <Medical {...props} role={TRAINING_STATUS.MEDICAL} />
      <Picture {...props} role={TRAINING_STATUS.TRAINING_COORDINATOR} />
      <Signature {...props} role={TRAINING_STATUS.TRAINING_COORDINATOR} />
      {/* <Assesment {...props} role={TRAINING_STATUS.ASSESSMENT}/> */}
      <QAApproval {...props} role={TRAINING_STATUS.QA} />
      <Payment {...props} role={TRAINING_STATUS.FINANCE} />
      <MDApproval {...props} role={TRAINING_STATUS.MD} />
      <Print
        {...props}
        type={DOC_TYPE.CERTIFICATE}
        role={TRAINING_STATUS.CERT_PRINT}
      />
      <Print
        {...props}
        type={DOC_TYPE.ID_CARD}
        role={TRAINING_STATUS.ID_CARD_PRINT}
      />
    </>
  )
}
