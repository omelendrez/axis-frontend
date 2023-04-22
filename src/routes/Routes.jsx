import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ProtectedRoute } from '../guard'
import useUser from '../hooks/useUser'
import Companies from '../pages/Companies'
import Company from '../pages/Company'

const NotFound = lazy(() => import('../components/navbar/NotFound'))
const ChangePassword = lazy(() => import('../pages/ChangePassword'))

const Home = lazy(() => import('../pages/Home'))
const Login = lazy(() => import('../pages/Login'))

const Dashboard = lazy(() => import('../pages/Dashboard'))

const Users = lazy(() => import('../pages/Users'))
const User = lazy(() => import('../pages/User'))

const Trainees = lazy(() => import('../pages/Trainees'))
const Trainee = lazy(() => import('../pages/Trainee'))

const Roles = lazy(() => import('../pages/Roles'))
const Role = lazy(() => import('../pages/Role'))

const States = lazy(() => import('../pages/States'))
const State = lazy(() => import('../pages/State'))

const Nationalities = lazy(() => import('../pages/Nationalities'))
const Nationality = lazy(() => import('../pages/Nationality'))

export const AppRoutes = () => {
  const { user } = useUser()
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute user={user}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/:id"
        element={
          <ProtectedRoute user={user}>
            <User />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute user={user}>
            <User />
          </ProtectedRoute>
        }
      />

      <Route
        path="/trainees"
        element={
          <ProtectedRoute user={user}>
            <Trainees />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trainee/:id"
        element={
          <ProtectedRoute user={user}>
            <Trainee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trainee"
        element={
          <ProtectedRoute user={user}>
            <Trainee />
          </ProtectedRoute>
        }
      />

      <Route
        path="/roles"
        element={
          <ProtectedRoute user={user}>
            <Roles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/role/:id"
        element={
          <ProtectedRoute user={user}>
            <Role />
          </ProtectedRoute>
        }
      />
      <Route
        path="/role"
        element={
          <ProtectedRoute user={user}>
            <Role />
          </ProtectedRoute>
        }
      />

      <Route
        path="/states"
        element={
          <ProtectedRoute user={user}>
            <States />
          </ProtectedRoute>
        }
      />
      <Route
        path="/state/:id"
        element={
          <ProtectedRoute user={user}>
            <State />
          </ProtectedRoute>
        }
      />
      <Route
        path="/state"
        element={
          <ProtectedRoute user={user}>
            <State />
          </ProtectedRoute>
        }
      />

      <Route
        path="/nationalities"
        element={
          <ProtectedRoute user={user}>
            <Nationalities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nationality/:id"
        element={
          <ProtectedRoute user={user}>
            <Nationality />
          </ProtectedRoute>
        }
      />
      <Route
        path="/nationality"
        element={
          <ProtectedRoute user={user}>
            <Nationality />
          </ProtectedRoute>
        }
      />

      <Route
        path="/companies"
        element={
          <ProtectedRoute user={user}>
            <Companies />
          </ProtectedRoute>
        }
      />
      <Route
        path="/company/:id"
        element={
          <ProtectedRoute user={user}>
            <Company />
          </ProtectedRoute>
        }
      />
      <Route
        path="/company"
        element={
          <ProtectedRoute user={user}>
            <Company />
          </ProtectedRoute>
        }
      />

      <Route
        path="/change-password"
        element={
          <ProtectedRoute user={user}>
            <ChangePassword />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute user={user}>
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
