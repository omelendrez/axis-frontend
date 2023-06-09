import {
  Foet,
  ScanId,
  Medical,
  Print,
  Payment,
  Picture,
  Signature,
  QAApproval,
  MDApproval,
  WelcomeLetter
} from './actions'

import useUser from '@/hooks/useUser'

import { DOC_TYPE, ROLES } from '@/helpers'

export const Action = ({ training, onUpdate }) => {
  const { user } = useUser()
  const props = {
    training,
    onUpdate,
    user
  }

  return (
    <>
      <WelcomeLetter {...props} role={ROLES.ADMIN} />
      <Foet {...props} role={ROLES.ADMIN} />
      <ScanId {...props} role={ROLES.FRONTDESK} />
      <Medical {...props} role={ROLES.MEDICAL} />
      <Picture {...props} role={ROLES.TRAINING_COORDINATOR} />
      <Signature {...props} role={ROLES.TRAINING_COORDINATOR} />
      {/* <Assessment {...props} role={ROLES.ASSESSMENT}/> */}
      <QAApproval {...props} role={ROLES.QA} />
      <Payment {...props} role={ROLES.FINANCE} />
      <MDApproval {...props} role={ROLES.MD} />
      <Print {...props} type={DOC_TYPE.CERTIFICATE} role={ROLES.CERT_PRINT} />
      <Print {...props} type={DOC_TYPE.ID_CARD} role={ROLES.ID_CARD_PRINT} />
    </>
  )
}
