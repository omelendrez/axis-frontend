import {
  Foet,
  ScanId,
  Medical,
  Print,
  Payment,
  Picture,
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
      <Foet {...props} role={USER_ROLE.ADMIN} />

      <WelcomeLetter {...props} role={USER_ROLE.ADMIN} />

      <ScanId {...props} role={USER_ROLE.FRONTDESK} />

      <Medical {...props} role={USER_ROLE.MEDIC} />

      <Picture {...props} role={USER_ROLE.TRAINING_COORDINATOR} />

      <Payment {...props} role={USER_ROLE.ACCOUNTS} />

      <QAApproval {...props} role={USER_ROLE.QA} />

      <MDApproval {...props} role={USER_ROLE.MD} />

      <Print {...props} type={DOC_TYPE.CERTIFICATE} role={USER_ROLE.PRINTER} />

      <Print {...props} type={DOC_TYPE.ID_CARD} role={USER_ROLE.PRINTER} />
    </section>
  )
}
