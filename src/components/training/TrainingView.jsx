import { Photo, Learner } from '../learner/learner-view'
import { Course } from './training-view'
import { Action } from './training-actions'
import { Divider } from '../shared'

import './trainingView.css'

export const TrainingView = ({ training, tracking }) => {
  if (!training) {
    return (
      <article>
        <center>Record not found</center>
      </article>
    )
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
