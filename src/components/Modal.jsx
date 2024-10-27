import React from 'react';

const Modal = ({ user, pointsHistory, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg h-96 shadow-lg overflow-hidden">
                <h2 className="text-xl font-semibold mb-4 text-center">{user.username}'s Points History</h2>
                
                <div className="overflow-y-auto h-64 border-t border-b mt-2 px-4 py-2 space-y-4">
                    {pointsHistory.map((entry, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center p-3 border rounded-lg shadow-sm bg-gray-50"
                        >
                            <div className="text-sm text-gray-600">
                                <span className="font-semibold">Date:</span> {entry.date}
                            </div>
                            <div className="text-sm text-blue-500 font-bold">
                                +{entry.pointsAwarded} pts
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
