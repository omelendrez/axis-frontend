import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '../guard'

const Classes = lazy(() => import('../pages/Classes'))
const Class = lazy(() => import('../pages/Class'))

export const classRoutes = (
  <>
    <Route
      path="/classes"
      element={
        <ProtectedRoute>
          <Classes />
        </ProtectedRoute>
      }
    />
    <Route
      path="/class/:id"
      element={
        <ProtectedRoute>
          <Class />
        </ProtectedRoute>
      }
    />
    <Route
      path="/class"
      element={
        <ProtectedRoute>
          <Class />
        </ProtectedRoute>
      }
    />
  </>
)
