import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const NotFound = lazy(() => import('@/components/navbar/NotFound'))

export const notFoundRoutes = (
  <Route
    path="*"
    element={
      <ProtectedRoute>
        <NotFound />
      </ProtectedRoute>
    }
  />
)
