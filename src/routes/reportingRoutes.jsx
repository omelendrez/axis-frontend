import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Reporting = lazy(() => import('@/pages/Reporting'))
const TopTrainingCourses = lazy(() => import('@/pages/TopTrainingCourses'))
const LearnerByMonth = lazy(() => import('@/pages/LearnerByMonth'))
const CourseByMonth = lazy(() => import('@/pages/CourseByMonth'))
const CoursesTreemap = lazy(() => import('@/pages/CoursesTreemap'))

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
    <Route
      exact
      path="/reporting/learner-by-month"
      element={
        <ProtectedRoute>
          <LearnerByMonth />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/reporting/course-by-month"
      element={
        <ProtectedRoute>
          <CourseByMonth />
        </ProtectedRoute>
      }
    />
    <Route
      exact
      path="/reporting/courses-treemap"
      element={
        <ProtectedRoute>
          <CoursesTreemap />
        </ProtectedRoute>
      }
    />
  </>
)
