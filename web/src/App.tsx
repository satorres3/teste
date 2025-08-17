import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Hub from "@/pages/Hub";
import Settings from "@/pages/Settings";
import Workspace from "@/pages/Workspace";
import Knowledge from "@/pages/Knowledge";
import { Sidebar } from "@/components/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/hub" element={<Hub />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/workspace/:id" element={<Workspace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
