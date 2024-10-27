import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URI}/api/user/v1/get-users`);
        setFriends(response.data.data.sort((a, b) => b.Points - a.Points));
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const handleClaimPoints = async (friendUsername) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_REACT_APP_API_URI}/api/user/v1/claim-points`, {
        username: friendUsername,
      });

      const updatedFriends = friends.map((friend) =>
        friend.username === friendUsername
          ? { ...friend, Points: response.data.data.Points }
          : friend
      );

      // Sort updated friends list by points
      updatedFriends.sort((a, b) => b.Points - a.Points);

      setFriends(updatedFriends);
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  // Loading state
  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 py-8 px-4">
      <h1 className="text-2xl font-bold text-blue-600 mb-6">Leaderboard</h1>
      <div className="w-full max-w-3xl">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-4 text-left font-semibold">Rank</th>
              <th className="p-4 text-left font-semibold">Name</th>
              <th className="p-4 text-left font-semibold">Points</th>
            </tr>
          </thead>
          <tbody>
            {friends.map((friend, index) => (
              <tr
                key={friend._id}
                onClick={() => handleClaimPoints(friend.username)}
                className="cursor-pointer transition-colors duration-200 hover:bg-blue-100 border-b last:border-none"
              >
                <td className="p-4 text-gray-800">{index + 1}</td>
                <td className="p-4 text-gray-900 font-medium">{friend.username}</td>
                <td className="p-4 text-gray-700">{friend.Points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm text-gray-500 text-center">
          Click on a name to increase points and update rankings
        </p>
      </div>
    </div>
  );
};

export default HomePage;
