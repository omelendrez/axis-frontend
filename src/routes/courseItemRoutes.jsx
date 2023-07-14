import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const CourseItems = lazy(() => import('@/pages/CourseItems'))
const CourseItem = lazy(() => import('@/pages/CourseItem'))

export const courseItemRoutes = (
  <>
    <Route
      path="/course-items"
      element={
        <ProtectedRoute>
          <CourseItems />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/course-item"
      element={
        <ProtectedRoute>
          <CourseItem />
        </ProtectedRoute>
      }
    />
    <Route
      path="/course-item/:id"
      element={
        <ProtectedRoute>
          <CourseItem />
        </ProtectedRoute>
      }
    />
  </>
)
