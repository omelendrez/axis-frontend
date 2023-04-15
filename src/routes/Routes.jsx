import { Routes, Route } from "react-router-dom"
import { Home, Login, ChangePassword, Dashboard, Users } from '../pages'
import { NotFound } from '../components'
import { useContext } from "react"
import { UserContext } from "../context"
import { ProtectedRoute } from "../guard"

export const AppRoutes = () => {
  const { user } = useContext(UserContext)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
        <ProtectedRoute user={user}>
          <Dashboard />
        </ProtectedRoute>}
      />
      <Route path="/users" element={
        <ProtectedRoute user={user}>
          <Users />
        </ProtectedRoute>}
      />
      <Route path="/change-password" element={
        <ProtectedRoute user={user}>
          <ChangePassword />
        </ProtectedRoute>}
      />
      <Route path="*" element={
        <ProtectedRoute user={user}>
          <NotFound />
        </ProtectedRoute>}
      />
    </Routes>
  )
}
