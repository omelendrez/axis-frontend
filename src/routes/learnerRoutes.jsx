import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { ProtectedRoute } from '@/guard'

const Learners = lazy(() => import('@/pages/Learners'))
const Learner = lazy(() => import('@/pages/Learner'))

export const learnerRoutes = (
  <>
    <Route
      path="/learners"
      element={
        <ProtectedRoute>
          <Learners />
        </ProtectedRoute>
      }
    />

    <Route
      path="/learner/add"
      element={
        <ProtectedRoute>
          <Learner isAdding />
        </ProtectedRoute>
      }
    />
    <Route
      path="/learner/edit"
      element={
        <ProtectedRoute>
          <Learner isEditing />
        </ProtectedRoute>
      }
    />
    <Route
      path="/learner/:id"
      element={
        <ProtectedRoute>
          <Learner isViewing />
        </ProtectedRoute>
      }
    />
    <Route
      path="/learner/:id/edit"
      element={
        <ProtectedRoute>
          <Learner isEditing />
        </ProtectedRoute>
      }
    />
  </>
)
