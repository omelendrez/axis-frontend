import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const States = lazy(() => import('@/pages/States'))
const State = lazy(() => import('@/pages/State'))

export const stateRoutes = (
  <>
    <Route
      path="/states"
      element={
        <ProtectedRoute>
          <States />
        </ProtectedRoute>
      }
    />
    <Route
      path="/state/:id"
      element={
        <ProtectedRoute>
          <State />
        </ProtectedRoute>
      }
    />
    <Route
      path="/state"
      element={
        <ProtectedRoute>
          <State />
        </ProtectedRoute>
      }
    />
  </>
)
