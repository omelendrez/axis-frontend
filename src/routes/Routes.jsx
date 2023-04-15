import { Routes, Route } from "react-router-dom"
import { Home, Login, Dashboard } from '../pages'
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
