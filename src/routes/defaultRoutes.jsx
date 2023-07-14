import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Login = lazy(() => import('@/pages/Login'))
const ChangePassword = lazy(() => import('@/pages/ChangePassword'))

export const defaultRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route
      path="/change-password"
      element={
        <ProtectedRoute>
          <ChangePassword />
        </ProtectedRoute>
      }
    />
  </>
)
