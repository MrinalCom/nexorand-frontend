import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const register = async (userData) => {
    try {
      // Example of a registration API call
      // const response = await api.register(userData);
      setUser(userData);
    } catch (err) {
      setError('Registration failed. Please try again.'); // Handle registration error
    }
  };

  const login = async (userData) => {
    try {
      // Example of a login API call
      // const response = await api.login(userData);
      setUser(userData);
    } catch (err) {
      setError('Login failed. Please check your credentials.'); // Handle login error
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const clearError = () => {
    setError(null); // Method to clear errors
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};
