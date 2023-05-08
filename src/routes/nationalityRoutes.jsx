import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '../guard'

const Nationalities = lazy(() => import('../pages/Nationalities'))
const Nationality = lazy(() => import('../pages/Nationality'))

export const nationalityRoutes = (
  <>
    <Route
      path="/nationalities"
      element={
        <ProtectedRoute>
          <Nationalities />
        </ProtectedRoute>
      }
    />
    <Route
      path="/nationality/:id"
      element={
        <ProtectedRoute>
          <Nationality />
        </ProtectedRoute>
      }
    />
    <Route
      path="/nationality"
      element={
        <ProtectedRoute>
          <Nationality />
        </ProtectedRoute>
      }
    />
  </>
)
