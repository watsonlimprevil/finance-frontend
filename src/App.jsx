import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Pages WITHOUT sidebar */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Pages WITH sidebar */}
        <Route
          path="/dashboard"
          element={
            <>
              <Sidebar />
              <div className="main-content">
                <Dashboard />
              </div>
            </>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
