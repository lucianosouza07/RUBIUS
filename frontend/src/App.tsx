import { Routes, Route, Navigate, Outlet } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import SidebarLayout from "./components/SidebarLayout";
import HomeFeature from "./features/home";
import ChatFeature from "./features/chat";
import SpacesFeature from "./features/spaces";
import WorldCupHubFeature from "./features/worldcup-hub";
import ComputerModeFeature from "./features/computer-mode";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        {/* Authenticated Routes sharing SidebarLayout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<SidebarLayout />}>
            <Route path="/dashboard" element={<HomeFeature />} />
            <Route path="/chat" element={<ChatFeature />} />
            <Route path="/spaces" element={<SpacesFeature />} />
            <Route path="/worldcup-hub" element={<WorldCupHubFeature />} />
            <Route path="/computer-mode" element={<ComputerModeFeature />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

const ProtectedRoute = () => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-surface text-on-surface">
        <span className="font-body text-sm font-semibold animate-pulse">Carregando...</span>
      </div>
    );
  }

  if (!authenticated) {
    console.log("Tried to go to protected route");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default App;
