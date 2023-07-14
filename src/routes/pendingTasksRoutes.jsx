import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const PendingTasks = lazy(() => import('@/pages/PendingTasks'))

export const pendingTasksRoutes = (
  <Route
    path="/pending-tasks"
    element={
      <ProtectedRoute>
        <PendingTasks />
      </ProtectedRoute>
    }
  />
)
