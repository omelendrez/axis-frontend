import { Photo, Learner } from '../learner/learner-view'
import { Course } from './training-view'
import './trainingView.css'

export const TrainingView = ({ training }) => (
  <main className="training-view">
    <Photo {...training} />
    <Learner learner={{ ...training, status: undefined }} />
    <Course training={training} />
  </main>
)
