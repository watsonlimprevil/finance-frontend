import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./pages/Insights";
import Settings from "./components/Settings";

import Layout from "./components/Layout";
import AddTransaction from "./components/AddTransactions";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <Layout>
              {({ summary, transactions }) => (
                <Dashboard summary={summary} transactions={transactions} />
              )}
            </Layout>
          }
        />

        <Route
          path="/transactions"
          element={
            <Layout>
              {({ summary, transactions }) => (
                <Transactions transactions={transactions} summary={summary} />
              )}
            </Layout>
          }
        />

        <Route
          path="/insights"
          element={
            <Layout>
              {({ summary }) => (
                <Insights summary={summary} />
              )}
            </Layout>
          }
        />

        <Route
          path="/settings"
          element={
            <Layout>
              {({ summary }) => (
                <Settings summary={summary} />
              )}
            </Layout>
          }
        />
<Route 
path='/add'
element={<AddTransaction/>}
/>
      </Routes>
    </BrowserRouter>
  );
}
