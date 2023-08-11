import {
  Assessment,
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

import { DOC_TYPE, USER_ROLE } from '@/helpers'

export const Action = ({ training, onUpdate }) => {
  const { user } = useUser()
  const props = {
    training,
    onUpdate,
    user
  }

  return (
    <section className="training-view-actions">
      <WelcomeLetter {...props} role={USER_ROLE.ADMIN} />
      <Foet {...props} role={USER_ROLE.ADMIN} />
      <ScanId {...props} role={USER_ROLE.FRONTDESK} />
      <Medical {...props} role={USER_ROLE.MEDICAL} />
      <Picture {...props} role={USER_ROLE.TRAINING_COORDINATOR} />
      <Signature {...props} role={USER_ROLE.TRAINING_COORDINATOR} />
      <Assessment {...props} role={USER_ROLE.ASSESSMENT} />
      <MDApproval {...props} role={USER_ROLE.MD} />
      <QAApproval {...props} role={USER_ROLE.QA} />
      <Payment {...props} role={USER_ROLE.FINANCE} />
      <Print
        {...props}
        type={DOC_TYPE.CERTIFICATE}
        role={USER_ROLE.CERT_PRINT}
      />
      <Print {...props} type={DOC_TYPE.ID_CARD} role={USER_ROLE.PRINTER} />
    </section>
  )
}
