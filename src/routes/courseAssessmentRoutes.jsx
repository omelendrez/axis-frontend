import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const CourseAssessments = lazy(() => import('@/pages/CourseAssessments'))
const CourseAssessment = lazy(() => import('@/pages/CourseAssessment'))

export const courseAssessmentRoutes = (
  <>
    <Route
      path="/course-assessments"
      element={
        <ProtectedRoute>
          <CourseAssessments />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/course-assessment"
      element={
        <ProtectedRoute>
          <CourseAssessment />
        </ProtectedRoute>
      }
    />
    <Route
      path="/course-assessment/:id"
      element={
        <ProtectedRoute>
          <CourseAssessment />
        </ProtectedRoute>
      }
    />
  </>
)
