import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Layout from "./components/Layout";

import Settings from "./components/Settings";
import Transactions from "./components/Transactions";
import Insights from "./pages/Insights";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>

        <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard/>
          </Layout>
        }
        />


        <Route
        path="/transactions"
        element={
          <Layout>
            <Transactions/>
          </Layout>
        }
        />


        <Route
        path="/insights"
        element={
          <Layout>
          <Insights/>
          </Layout>
        }
        />

        <Route
        path="/settings"
        element={
          <Layout>
            <Settings/>
          </Layout>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}
