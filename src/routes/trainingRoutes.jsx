import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Training = lazy(() => import('@/pages/Training'))

export const trainingRoutes = (
  <Route
    path="/training/:id"
    element={
      <ProtectedRoute>
        <Training />
      </ProtectedRoute>
    }
  />
)
