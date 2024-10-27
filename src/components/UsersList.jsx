// src/components/UserList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { FaUser, FaTrophy } from 'react-icons/fa';
import { format } from 'date-fns';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pointsHistory, setPointsHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch users from the API
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URI}/api/user/v1/get-users`);
            const sortedUsers = response.data.data.sort((a, b) => b.points - a.points);
            setUsers(sortedUsers);
        } catch (err) {
            setError('Error fetching users');
        } finally {
            setLoading(false);
        }
    };

    // Fetch user points history
    const fetchUserHistory = async (username) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URI}/api/user/v1/your-history`, { username });
            setPointsHistory(response.data.data);
        } catch (err) {
            setError('Error fetching user history');
        }
    };

    // Handle user click to open modal
    const handleUserClick = (user) => {
        setSelectedUser(user);
        fetchUserHistory(user.username);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
        setPointsHistory([]);
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-64"><p className="text-gray-600">Loading...</p></div>;
    if (error) return <p className="text-red-500 font-semibold text-center">{error}</p>;

    return (
        <div className="p-6 max-w-7xl mx-auto bg-white border border-gray-300 shadow-lg rounded-lg">
            {users.length === 0 ? (
                <p className="text-gray-500 text-center">No users found.</p>
            ) : (
                <ul className="space-y-3">
                    {users.map((user) => (
                        <li
                            key={user._id}
                            className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer shadow-sm"
                            onClick={() => handleUserClick(user)}
                        >
                            <div className="flex items-center">
                                <FaUser className="text-gray-500 mr-2" />
                                <span className="text-gray-700 font-semibold">{user.username}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-600 font-medium">{user.Points} pts</span>
                                <FaTrophy className="text-yellow-500 ml-2" />
                            </div>
                            <div className="text-gray-500">
                                {user.createdAt && format(new Date(user.createdAt), 'MMM d, yyyy h:mm a')}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {isModalOpen && (
                <Modal user={selectedUser} pointsHistory={pointsHistory} onClose={closeModal} />
            )}
        </div>
    );
};

export default UserList;
