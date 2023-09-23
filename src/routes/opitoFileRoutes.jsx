import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const OpitoFile = lazy(() => import('@/pages/OpitoFileGenerate'))

export const opitoFileRoutes = (
  <Route
    path="/opito-files"
    element={
      <ProtectedRoute>
        <OpitoFile />
      </ProtectedRoute>
    }
  />
)
