import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '../guard'

const Courses = lazy(() => import('../pages/Courses'))
const Course = lazy(() => import('../pages/Course'))

export const courseRoutes = (
  <>
    <Route
      path="/courses"
      element={
        <ProtectedRoute>
          <Courses />
        </ProtectedRoute>
      }
    />
    <Route
      path="/course/:id"
      element={
        <ProtectedRoute>
          <Course />
        </ProtectedRoute>
      }
    />
    <Route
      path="/course"
      element={
        <ProtectedRoute>
          <Course />
        </ProtectedRoute>
      }
    />
  </>
)
