import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard, Home, Login, Profile, Register } from "@/pages";
import { AuthProvider } from "@/auth";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/auth";

function RestrictedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (user) return <Navigate to="/c" replace />;

  return <Outlet />;
}

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export function Router() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<RestrictedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile/:username" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
