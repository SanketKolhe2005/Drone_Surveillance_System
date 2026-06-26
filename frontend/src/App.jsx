import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Monitoring from "./pages/dashboard/Monitoring";
import History from "./pages/dashboard/History";
import Alerts from "./pages/dashboard/Alerts";
import Settings from "./pages/dashboard/Settings";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login Route */}

        <Route
          path="/login"
          element={<Login />}
        />

        {/* Register Route */}

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Monitoring */}

        <Route
          path="/monitoring"
          element={
            <ProtectedRoute>
              <Monitoring />
            </ProtectedRoute>
          }
        />

        {/* History */}

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        {/* Alerts */}

        <Route
          path="/alerts"
          element={
            <ProtectedRoute>
              <Alerts />
            </ProtectedRoute>
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;
