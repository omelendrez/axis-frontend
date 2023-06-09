import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '../guard'

const Classroom = lazy(() => import('../pages/Classroom'))

export const classroomRoutes = (
  <Route
    path="/classroom/:id"
    element={
      <ProtectedRoute>
        <Classroom />
      </ProtectedRoute>
    }
  />
)
