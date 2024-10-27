import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URI}/api/auth/v1/login`, formData);
      login(response.data);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 p-4">
      <form onSubmit={handleSubmit} className="bg-lavender-100 shadow-lg rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-center text-2xl font-bold mb-6 text-purple-700">Login</h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            placeholder='Enter your username'
            onChange={handleChange}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder='Enter your password'
            onChange={handleChange}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white font-bold transition-all ${loading ? 'bg-gradient-to-r from-blue-300 to-green-300' : 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'} focus:outline-none focus:ring-2 focus:ring-purple-300`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="pt-4 text-center">
          <Link to="/register" className="text-purple-600 hover:text-purple-800">
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
