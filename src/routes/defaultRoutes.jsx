import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const ChangePassword = lazy(() => import('@/pages/ChangePassword'))
const NotFound = lazy(() => import('../components/navbar/NotFound'))

export const defaultRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route
      path="*"
      element={
        <ProtectedRoute>
          <NotFound />
        </ProtectedRoute>
      }
    />
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
