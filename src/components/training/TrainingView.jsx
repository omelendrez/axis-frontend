import { Photo, Learner } from '../learner/learner-view'
import { Course, Action } from './training-view'
import { Divider, Loading } from '../shared'

import './trainingView.css'

export const TrainingView = ({ training, tracking }) => {
  if (!training) {
    return <Loading />
  }

  return (
    <main className="training-view">
      <Photo {...training} />
      <Learner learner={{ ...training, status: undefined }} />
      <Course training={training} tracking={tracking} />
      <Divider />
      <div className="actions">
        <Action training={training} />
      </div>
    </main>
  )
}
