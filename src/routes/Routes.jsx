import { Routes } from 'react-router-dom'

import { classRoutes } from './classRoutes'
import { companyRoutes } from './companyRoutes'
import { courseAssesmentRoutes } from './courseAssesmentRoutes'
import { courseItemRoutes } from './courseItemRoutes'
import { courseRoutes } from './courseRoutes'
import { dashboardRoutes } from './dashboardRoutes'
import { defaultRoutes } from './defaultRoutes'
import { homeRoutes } from './homeRoutes'
import { learnerRoutes } from './learnerRoutes'
import { nationalityRoutes } from './nationalityRoutes'
import { roleRoutes } from './roleRoutes'
import { stateRoutes } from './stateRoutes'
// import { trainingRoutes } from './trainingRoutes'
import { userRoutes } from './userRoutes'

export const AppRoutes = () => {
  return (
    <div className="routes-container">
      <Routes>
        {homeRoutes}
        {dashboardRoutes}
        {/* ------ */}
        {classRoutes}
        {companyRoutes}
        {courseAssesmentRoutes}
        {courseItemRoutes}
        {courseRoutes}
        {defaultRoutes}
        {learnerRoutes}
        {nationalityRoutes}
        {roleRoutes}
        {stateRoutes}
        {/* {trainingRoutes} */}
        {userRoutes}
      </Routes>
    </div>
  )
}
