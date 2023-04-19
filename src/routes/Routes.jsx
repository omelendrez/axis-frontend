import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  ChangePassword,
  Dashboard,
  Users,
  User,
  Trainees,
  Trainee,
  Roles,
  Role,
  States,
  State,
} from "../pages";
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
