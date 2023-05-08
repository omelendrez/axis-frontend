import { Navigate } from 'react-router-dom'
import useUser from '../hooks/useUser'

export const ProtectedRoute = ({ children }) => {
  const { user } = useUser()
  return user?.id ? children : <Navigate to="/login" replace />
}
