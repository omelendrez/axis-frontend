import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Backup = lazy(() => import('@/pages/Backup'))

export const backupRoutes = (
  <Route
    path="/backup"
    element={
      <ProtectedRoute>
        <Backup />
      </ProtectedRoute>
    }
  />
)
