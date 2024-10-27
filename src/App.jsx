import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './index.css';
import RegistrationPage from './pages/RegistrationPage';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Leaderboard from "./pages/Leaderboard";
import Navbar from "./components/NavBar";
import { useAuth } from './context/AuthContext';

export default function App() {
  const { user, loading, error } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-xl text-gray-600">Fetching...</h1>
        <p className="text-gray-500">Please wait while we load your data.</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/register" 
          element={<RegistrationPage />} 
        />
        <Route 
          path="/login" 
          element={<LoginPage />} 
        />
        <Route 
          path="/leaderboard" 
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          } 
        />
      </Routes> 
    </Router>
  );
}
