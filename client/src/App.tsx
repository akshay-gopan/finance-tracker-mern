import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Auth from "./pages/auth";
import { FinancialRecordsProvider } from "./context/financial-record-context";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
