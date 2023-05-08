import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '../guard'

const ChangePassword = lazy(() => import('../pages/ChangePassword'))
const Companies = lazy(() => import('../pages/Companies'))
const Company = lazy(() => import('../pages/Company'))
const Course = lazy(() => import('../pages/Course'))
const Courses = lazy(() => import('../pages/Courses'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Home = lazy(() => import('../pages/Home'))
const Learner = lazy(() => import('../pages/Learner'))
const Learners = lazy(() => import('../pages/Learners'))
const Login = lazy(() => import('../pages/Login'))
const Nationalities = lazy(() => import('../pages/Nationalities'))
const Nationality = lazy(() => import('../pages/Nationality'))
const NotFound = lazy(() => import('../components/navbar/NotFound'))
const Role = lazy(() => import('../pages/Role'))
const Roles = lazy(() => import('../pages/Roles'))
const State = lazy(() => import('../pages/State'))
const States = lazy(() => import('../pages/States'))
const Training = lazy(() => import('../pages/Training'))
const User = lazy(() => import('../pages/User'))
const Users = lazy(() => import('../pages/Users'))

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* Users  */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/:id"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        }
      />

      {/* Learners */}

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
            <Learner isEditing={true} />
          </ProtectedRoute>
        }
      />

      {/* Roles  */}
      <Route
        path="/roles"
        element={
          <ProtectedRoute>
            <Roles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/role/:id"
        element={
          <ProtectedRoute>
            <Role />
          </ProtectedRoute>
        }
      />
      <Route
        path="/role"
        element={
          <ProtectedRoute>
            <Role />
          </ProtectedRoute>
        }
      />
      {/* States  */}
      <Route
        path="/states"
        element={
          <ProtectedRoute>
            <States />
          </ProtectedRoute>
        }
      />
      <Route
        path="/state/:id"
        element={
          <ProtectedRoute>
            <State />
          </ProtectedRoute>
        }
      />
      <Route
        path="/state"
        element={
          <ProtectedRoute>
            <State />
          </ProtectedRoute>
        }
      />
      {/* Nationalities */}
      <Route
        path="/nationalities"
        element={
          <ProtectedRoute>
            <Nationalities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nationality/:id"
        element={
          <ProtectedRoute>
            <Nationality />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nationality"
        element={
          <ProtectedRoute>
            <Nationality />
          </ProtectedRoute>
        }
      />
      {/* Companies */}
      <Route
        path="/companies"
        element={
          <ProtectedRoute>
            <Companies />
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
      <Route
        path="/company"
        element={
          <ProtectedRoute>
            <Company />
          </ProtectedRoute>
        }
      />
      {/* Courses */}
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
      {/* Training */}
      <Route
        path="/training/:id"
        element={
          <ProtectedRoute>
            <Training />
          </ProtectedRoute>
        }
      />
      {/* Change password */}
      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
