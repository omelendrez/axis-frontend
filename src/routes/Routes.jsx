import { Routes } from 'react-router-dom'

import { companyRoutes } from './companyRoutes'
import { courseRoutes } from './courseRoutes'
import { courseItemRoutes } from './courseItemRoutes'
import { courseModuleRoutes } from './courseModuleRoutes'
import { defaultRoutes } from './defaultRoutes'
import { docManagerRoutes } from './docManagerRoutes'
import { homeRoutes } from './homeRoutes'
import { learnerRoutes } from './learnerRoutes'
import { opitoFileRoutes } from './opitoFileRoutes'
import { nationalityRoutes } from './nationalityRoutes'
import { notFoundRoutes } from './notFoundRoutes'
import { pendingTasksRoutes } from './pendingTasksRoutes'
import { reportingRoutes } from './reportingRoutes'
import { roleRoutes } from './roleRoutes'
import { stateRoutes } from './stateRoutes'
import { trainingRoutes } from './trainingRoutes'
import { userRoutes } from './userRoutes'

export const AppRoutes = () => {
  return (
    <div className="routes-container">
      <Routes>
        {companyRoutes}
        {courseRoutes}
        {courseItemRoutes}
        {courseModuleRoutes}
        {defaultRoutes}
        {docManagerRoutes}
        {homeRoutes}
        {learnerRoutes}
        {nationalityRoutes}
        {notFoundRoutes}
        {opitoFileRoutes}
        {pendingTasksRoutes}
        {roleRoutes}
        {stateRoutes}
        {trainingRoutes}
        {reportingRoutes}
        {userRoutes}
      </Routes>
    </div>
  )
}
