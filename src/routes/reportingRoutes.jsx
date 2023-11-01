import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Reporting = lazy(() => import('@/pages/Reporting'))

export const reportingRoutes = (
  <Route
    exact
    path="/reporting"
    element={
      <ProtectedRoute>
        <Reporting />
      </ProtectedRoute>
    }
  />
)
