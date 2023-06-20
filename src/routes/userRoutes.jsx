import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Users = lazy(() => import('@/pages/Users'))
const User = lazy(() => import('@/pages/User'))

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
      path="/user/add"
      element={
        <ProtectedRoute>
          <User isAdding />
        </ProtectedRoute>
      }
    />

    <Route
      path="/user/edit"
      element={
        <ProtectedRoute>
          <User isEditing />
        </ProtectedRoute>
      }
    />

    <Route
      path="/user/:id"
      element={
        <ProtectedRoute>
          <User isViewing />
        </ProtectedRoute>
      }
    />

    <Route
      path="/user/:id/edit"
      element={
        <ProtectedRoute>
          <User isEditing />
        </ProtectedRoute>
      }
    />
  </>
)
