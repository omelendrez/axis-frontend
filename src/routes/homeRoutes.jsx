import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Home = lazy(() => import('@/pages/Home'))

export const homeRoutes = (
  <Route
    exact
    path="/"
    element={
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    }
  />
)
