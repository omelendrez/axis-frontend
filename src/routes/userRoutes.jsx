import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '../guard'

const Users = lazy(() => import('../pages/Users'))
const User = lazy(() => import('../pages/User'))

export const userRoutes = (
  <>
    <Route
      path="/users"
      element={
        <ProtectedRoute>
          <Users />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user/:id"
      element={
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      }
    />
    <Route
      path="/user"
      element={
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      }
    />
  </>
)
