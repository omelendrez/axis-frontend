import { Photo, Learner } from '../learner/learner-view'
import { Course } from './training-view'
import { ScanId, BloodPressure } from './tasks'
import { Divider, Loading } from '../shared'

import useUser from '../../hooks/useUser'

import './trainingView.css'

const View = ({ training }) => {
  const {
    user: { roles: userRoles }
  } = useUser()

  const { status_id: statusId } = training

  if (userRoles.includes(3) && statusId === 1) {
    return <ScanId />
  }
  if (userRoles.includes(5) && statusId === 2) {
    return <BloodPressure />
  }
}

export const TrainingView = ({ training }) => {
  if (!training) {
    return <Loading />
  }

  return (
    <main className="training-view">
      <Photo {...training} />
      <Learner learner={{ ...training, status: undefined }} />
      <Course training={training} />
      <Divider />
      <div className="actions">
        <View training={training} />
      </div>
    </main>
  )
}
