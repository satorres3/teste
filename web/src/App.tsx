import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Hub from "@/pages/Hub";
import Settings from "@/pages/Settings";
import Workspace from "@/pages/Workspace";
import Knowledge from "@/pages/Knowledge";
import { Sidebar } from "@/components/Sidebar";
import { AuthProvider, PrivateRoute } from "@/lib/auth";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/hub" element={<PrivateRoute><Hub /></PrivateRoute>} />
              <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
              <Route path="/knowledge" element={<PrivateRoute><Knowledge /></PrivateRoute>} />
              <Route path="/workspace/:id" element={<PrivateRoute><Workspace /></PrivateRoute>} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
