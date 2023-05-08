import { Routes } from 'react-router-dom'

import { dashboardRoutes } from './dashboardRoutes'
import { userRoutes } from './userRoutes'
import { courseRoutes } from './courseRoutes'
import { companyRoutes } from './companyRoutes'
import { roleRoutes } from './roleRoutes'
import { stateRoutes } from './stateRoutes'
import { defaultRoutes } from './defaultRoutes'
import { learnerRoutes } from './learnerRoutes'
import { nationalityRoutes } from './nationalityRoutes'
import { trainingRoutes } from './trainingRoutes'

export const AppRoutes = () => {
  return (
    <Routes>
      {defaultRoutes}
      {dashboardRoutes}
      {userRoutes}
      {courseRoutes}
      {companyRoutes}
      {roleRoutes}
      {stateRoutes}
      {learnerRoutes}
      {nationalityRoutes}
      {trainingRoutes}
    </Routes>
  )
}
