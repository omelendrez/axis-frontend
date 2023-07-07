import { Routes } from 'react-router-dom'

import { classroomRoutes } from './classroomRoutes'
import { companyRoutes } from './companyRoutes'
import { courseAssessmentRoutes } from './courseAssessmentRoutes'
import { courseItemRoutes } from './courseItemRoutes'
import { courseRoutes } from './courseRoutes'
import { dashboardRoutes } from './dashboardRoutes'
import { defaultRoutes } from './defaultRoutes'
import { homeRoutes } from './homeRoutes'
import { learnerRoutes } from './learnerRoutes'
import { nationalityRoutes } from './nationalityRoutes'
import { roleRoutes } from './roleRoutes'
import { stateRoutes } from './stateRoutes'
import { trainingRoutes } from './trainingRoutes'
import { userRoutes } from './userRoutes'

export const AppRoutes = () => {
  return (
    <div className="routes-container">
      <Routes>
        {homeRoutes}
        {dashboardRoutes}
        {/* ------ */}
        {classroomRoutes}
        {companyRoutes}
        {courseAssessmentRoutes}
        {courseItemRoutes}
        {courseRoutes}
        {defaultRoutes}
        {learnerRoutes}
        {nationalityRoutes}
        {roleRoutes}
        {stateRoutes}
        {trainingRoutes}
        {userRoutes}
      </Routes>
    </div>
  )
}
