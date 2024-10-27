import UserList from "../components/UsersList";

const Leaderboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 py-12 px-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8 border-b-2 border-blue-500 pb-2">
        Leaderboard
      </h1>
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl overflow-hidden">
        <UserList />
      </div>
    </div>
  );
};

export default Leaderboard;
