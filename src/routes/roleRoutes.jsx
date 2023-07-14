import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Roles = lazy(() => import('@/pages/Roles'))
const Role = lazy(() => import('@/pages/Role'))

export const roleRoutes = (
  <>
    <Route
      path="/roles"
      element={
        <ProtectedRoute>
          <Roles />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/role"
      element={
        <ProtectedRoute>
          <Role />
        </ProtectedRoute>
      }
    />
    <Route
      path="/role/:id"
      element={
        <ProtectedRoute>
          <Role />
        </ProtectedRoute>
      }
    />
  </>
)
