import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Companies = lazy(() => import('@/pages/Companies'))
const Company = lazy(() => import('@/pages/Company'))

export const companyRoutes = (
  <>
    <Route
      path="/companies"
      element={
        <ProtectedRoute>
          <Companies />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/company"
      element={
        <ProtectedRoute>
          <Company />
        </ProtectedRoute>
      }
    />
    <Route
      path="/company/:id"
      element={
        <ProtectedRoute>
          <Company />
        </ProtectedRoute>
      }
    />
  </>
)
