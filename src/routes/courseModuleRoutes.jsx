import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const CourseModules = lazy(() => import('@/pages/CourseModules'))
const CourseModule = lazy(() => import('@/pages/CourseModule'))

export const courseModuleRoutes = (
  <>
    <Route
      path="/course-modules"
      element={
        <ProtectedRoute>
          <CourseModules />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/course-module"
      element={
        <ProtectedRoute>
          <CourseModule />
        </ProtectedRoute>
      }
    />
    <Route
      path="/course-module/:id"
      element={
        <ProtectedRoute>
          <CourseModule />
        </ProtectedRoute>
      }
    />
  </>
)
