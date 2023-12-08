import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Reporting = lazy(() => import('@/pages/Reporting'))
const TopTrainingCourses = lazy(() => import('@/pages/TopTrainingCourses'))

export const reportingRoutes = (
  <>
    <Route
      exact
      path="/reporting"
      element={
        <ProtectedRoute>
          <Reporting />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/reporting/top-training-courses"
      element={
        <ProtectedRoute>
          <TopTrainingCourses />
        </ProtectedRoute>
      }
    />
  </>
)
