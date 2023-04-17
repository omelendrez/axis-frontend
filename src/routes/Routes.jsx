import { Routes, Route } from "react-router-dom";
import { Home, Login, ChangePassword, Dashboard, Users, User } from "../pages";
import { NotFound } from "../components";
import { ProtectedRoute } from "../guard";
import useUser from "../hooks/useUser";

export const AppRoutes = () => {
  const { user } = useUser();
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
        path="/users/"
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
  );
};
