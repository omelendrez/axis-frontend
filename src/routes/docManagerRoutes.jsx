import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const DocManager = lazy(() => import('@/pages/DocManager'))

export const docManagerRoutes = (
  <Route
    exact
    path="/document-manager"
    element={
      <ProtectedRoute>
        <DocManager />
      </ProtectedRoute>
    }
  />
)
