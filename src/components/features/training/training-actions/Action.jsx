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

export const Action = ({ training, onUpdate, update }) => {
  const { user } = useUser()
  const props = {
    training,
    onUpdate,
    user
  }

  return (
    <section className="training-view-actions">
      <Foet {...props} role={USER_ROLE.ADMIN} update={update} />

      <WelcomeLetter {...props} role={USER_ROLE.ADMIN} update={update} />

      <ScanId {...props} role={USER_ROLE.FRONTDESK} update={update} />

      <Medical {...props} role={USER_ROLE.MEDIC} update={update} />

      <Picture
        {...props}
        role={USER_ROLE.TRAINING_COORDINATOR}
        update={update}
      />

      <Payment {...props} role={USER_ROLE.ACCOUNTS} update={update} />

      <QAApproval {...props} role={USER_ROLE.QA} update={update} />

      <MDApproval {...props} role={USER_ROLE.MD} update={update} />

      <Print
        {...props}
        type={DOC_TYPE.CERTIFICATE}
        role={USER_ROLE.PRINTER}
        update={update}
      />

      <Print
        {...props}
        type={DOC_TYPE.ID_CARD}
        role={USER_ROLE.PRINTER}
        update={update}
      />
    </section>
  )
}
