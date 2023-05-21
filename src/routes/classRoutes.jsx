import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '../guard'

const Classes = lazy(() => import('../pages/Classes'))
const Class = lazy(() => import('../pages/Class'))

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
    <Route
      path="/classroom/:id"
      element={
        <ProtectedRoute>
          <Class />
        </ProtectedRoute>
      }
    />
    <Route
      path="/classroom"
      element={
        <ProtectedRoute>
          <Class />
        </ProtectedRoute>
      }
    />
  </>
)
