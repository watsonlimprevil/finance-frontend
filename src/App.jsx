import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Transactions from "./components/Transactions";
import Insights from "./pages/Insights";
import Settings from "./components/Settings";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import AddTransaction from "./components/AddTransactions";
import Budgets from "./pages/Budgets";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />

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
<Route
path='/budgets'
element={<Budgets/>}
/>
      </Routes>
    </BrowserRouter>
  );
}
