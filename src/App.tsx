import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuthStore } from './stores/authStore';
import AppShell from './layouts/AppShell';
import AuthLayout from './layouts/AuthLayout';

import SplashPage from './pages/SplashPage';
import OnboardingPage from './pages/OnboardingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import RideInProgressPage from './pages/RideInProgressPage';
import RideSummaryPage from './pages/RideSummaryPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';
import WalletPage from './pages/WalletPage';
import DriverDashboardPage from './pages/DriverDashboardPage';
import EconomyDashboardPage from './pages/EconomyDashboardPage';
import FSDPage from './pages/FSDPage';
import SustainabilityPage from './pages/SustainabilityPage';
import ComparisonPage from './pages/ComparisonPage';
import NotFoundPage from './pages/NotFoundPage';

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}

export default function App() {
  const location = useLocation();
  return (
    <div className="relative w-full min-h-[100dvh] overflow-hidden">
      <div className="mx-auto max-w-[440px] min-h-[100dvh] relative">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<SplashPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />

            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route
              element={
                <RequireAuth>
                  <AppShell />
                </RequireAuth>
              }
            >
              <Route path="/home" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/ride" element={<RideInProgressPage />} />
              <Route path="/ride/summary" element={<RideSummaryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/driver" element={<DriverDashboardPage />} />
              <Route path="/economy" element={<EconomyDashboardPage />} />
              <Route path="/fsd" element={<FSDPage />} />
              <Route path="/sustainability" element={<SustainabilityPage />} />
              <Route path="/comparison" element={<ComparisonPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}
