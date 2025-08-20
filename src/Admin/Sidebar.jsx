import React, { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaUser,
  FaSignOutAlt,
  FaFileAlt,
  FaPlus,
} from "react-icons/fa";
import { Link } from "react-router-dom";

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
    <div className="fixed left-0 top-0 h-full w-64 m-3 rounded-xl bg-gradient-to-b from-[#1a1f2b] via-[#1e2a38] to-[#2c3e50] p-6 shadow-2xl flex flex-col border border-fuchsia-600/50">
      <h2 className="text-white text-2xl font-extrabold mb-8 tracking-wide">
        QPGS
      </h2>
      <nav className="flex flex-col space-y-5 mb-auto text-gray-300">
        <Link
          to="/Admin/dashboard"
          className="flex items-center hover:text-fuchsia-400 transition duration-200"
        >
          <FaTachometerAlt className="mr-3" />
          Dashboard
        </Link>
        <Link
          to="/Admin/register"
          className="flex items-center hover:text-fuchsia-400 transition duration-200"
        >
          <FaFileAlt className="mr-3" />
          Add Users
        </Link>
        <Link
          to="/Admin/users"
          className="flex items-center hover:text-fuchsia-400 transition duration-200"
        >
          <FaUsers className="mr-3" />
          Display Users
        </Link>
        <Link
          to="/Admin/subjects"
          className="flex items-center hover:text-fuchsia-400 transition duration-200"
        >
          <FaPlus className="mr-3" />
          Add Subjects
        </Link>
      </nav>

      <div className="mt-auto">
        {user ? (
          <>
            <div className="flex items-center text-gray-200 mb-3">
              <FaUser className="mr-2 text-fuchsia-400" />
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
          <p className="text-gray-400">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
