import React, { useEffect, useState } from "react";
import { FaTachometerAlt, FaUsers, FaUser, FaSignOutAlt, FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import QuestionModal from "./QuestionModal"; // Import the Modal

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/"; // Redirect to login after logout
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 m-3 rounded-lg 
      bg-gradient-to-b from-indigo-900 via-purple-800 to-blue-900 
      p-6 shadow-2xl flex flex-col border-2 border-indigo-600">
      
      <h2 className="text-white text-2xl font-extrabold mb-6 tracking-wide">
        QPGS
      </h2>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 mb-auto">
        <Link
          to="/home"
          className="flex items-center text-white hover:text-cyan-300 transition duration-200"
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </Link>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center text-white hover:text-cyan-300 transition duration-200 mt-2"
        >
          <FaFileAlt className="mr-3" />
          Generate Question
        </button>

        <Link
          to="/question"
          className="flex items-center text-white hover:text-cyan-300 transition duration-200"
        >
          <FaFileAlt className="mr-3" />
          Question
        </Link>

        <Link
          to="/questionpapers"
          className="flex items-center text-white hover:text-cyan-300 transition duration-200"
        >
          <FaUsers className="mr-3" />
          Download QPaper
        </Link>
      </nav>

      {/* User Info + Logout */}
      <div className="mt-auto">
        {user ? (
          <>
            <div className="flex items-center text-white mb-2">
              <FaUser className="mr-2 text-cyan-300" />
              <span>{user.name || "User"}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-red-400 hover:text-red-300 transition duration-200"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </>
        ) : (
          <p className="text-white">Loading...</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && <QuestionModal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Sidebar;
