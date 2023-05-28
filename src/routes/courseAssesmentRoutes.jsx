import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '../guard'

const CourseAssesments = lazy(() => import('../pages/CourseAssesments'))
const CourseAssesment = lazy(() => import('../pages/CourseAssesment'))

export const courseAssesmentRoutes = (
  <>
    <Route
      path="/course-assesments"
      element={
        <ProtectedRoute>
          <CourseAssesments />
        </ProtectedRoute>
      }
    />
    <Route
      path="/course-assesment/:id"
      element={
        <ProtectedRoute>
          <CourseAssesment />
        </ProtectedRoute>
      }
    />
    <Route
      path="/course-assesment"
      element={
        <ProtectedRoute>
          <CourseAssesment />
        </ProtectedRoute>
      }
    />
  </>
)
