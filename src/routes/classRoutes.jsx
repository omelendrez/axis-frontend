import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '../guard'

const Classes = lazy(() => import('../pages/Classes'))

export const classRoutes = (
  <>
    <Route
      path="/classrooms"
      element={
        <ProtectedRoute>
          <Classes />
        </ProtectedRoute>
      }
    />
  </>
)
