import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '../guard'

const Dashboard = lazy(() => import('../pages/Dashboard'))

export const dashboardRoutes = (
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
)
