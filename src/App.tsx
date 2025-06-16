import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import LoginForm from './components/Auth/LoginForm';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import InventoryManagement from './components/Inventory/InventoryManagement';
import InventoryTracking from './components/Inventory/InventoryTracking';
import RoastingOperations from './components/Roasting/RoastingOperations';
import RoastingProfileManager from './components/Roasting/RoastingProfileManager';
import QualityControl from './components/Quality/QualityControl';
import ProductionPlanning from './components/Production/ProductionPlanning';
import PricingCalculator from './components/Pricing/PricingCalculator';
import SalesManagement from './components/Sales/SalesManagement';
import FinancialReports from './components/Reports/FinancialReports';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import UserManagement from './components/Users/UserManagement';
import SystemSettings from './components/Settings/SystemSettings';

function AppContent() {
  const { state, auth } = useAppContext();
  const { user } = state;

  if (auth.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-64">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/inventory" element={<InventoryManagement />} />
              <Route path="/inventory/tracking" element={<InventoryTracking />} />
              <Route path="/roasting" element={<RoastingOperations />} />
              <Route path="/roasting/profiles" element={<RoastingProfileManager />} />
              <Route path="/quality" element={<QualityControl />} />
              <Route path="/production" element={<ProductionPlanning />} />
              <Route path="/pricing" element={<PricingCalculator />} />
              <Route path="/sales" element={<SalesManagement />} />
              <Route path="/reports" element={<FinancialReports />} />
              <Route path="/analytics" element={<AnalyticsDashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/settings" element={<SystemSettings />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;