import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Training = lazy(() => import('@/pages/Training'))
const Trainings = lazy(() => import('@/pages/Trainings'))

export const trainingRoutes = (
  <>
    <Route
      path="/trainings"
      element={
        <ProtectedRoute>
          <Trainings />
        </ProtectedRoute>
      }
    />
    <Route
      path="/training/:id"
      element={
        <ProtectedRoute>
          <Training />
        </ProtectedRoute>
      }
    />
  </>
)
