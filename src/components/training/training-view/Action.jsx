import { ScanId, BloodPressure, Print } from '../tasks'
import useUser from '../../../hooks/useUser'
import { DOC_TYPE } from '../../../helpers'

export const Action = ({ training }) => {
  const {
    user: { roles: userRoles }
  } = useUser()

  const { status_id: statusId } = training

  if (userRoles.includes(3) && statusId === 1) {
    return <ScanId training={training} />
  }

  if (userRoles.includes(5) && statusId === 2) {
    return <BloodPressure training={training} />
  }

  // if (userRoles.includes(10) && statusId === 8) {
  return <Print training={training} type={DOC_TYPE.CERTIFICATE} />
  // }

  // if (userRoles.includes(10) && statusId === 9) {
  // return <Print training={training} type={DOC_TYPE.ID_CARD} />
  // }
}
