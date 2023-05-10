import { Routes } from 'react-router-dom'

import { companyRoutes } from './companyRoutes'
import { courseItemRoutes } from './courseItemRoutes'
import { courseRoutes } from './courseRoutes'
import { dashboardRoutes } from './dashboardRoutes'
import { defaultRoutes } from './defaultRoutes'
import { learnerRoutes } from './learnerRoutes'
import { nationalityRoutes } from './nationalityRoutes'
import { roleRoutes } from './roleRoutes'
import { stateRoutes } from './stateRoutes'
import { trainingRoutes } from './trainingRoutes'
import { userRoutes } from './userRoutes'

export const AppRoutes = () => {
  return (
    <Routes>
      {companyRoutes}
      {courseItemRoutes}
      {courseRoutes}
      {dashboardRoutes}
      {defaultRoutes}
      {learnerRoutes}
      {nationalityRoutes}
      {roleRoutes}
      {stateRoutes}
      {trainingRoutes}
      {userRoutes}
    </Routes>
  )
}
