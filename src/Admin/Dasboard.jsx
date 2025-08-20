import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import { FaFileAlt, FaClipboardList } from "react-icons/fa";

function Dasboard() {
  const location = useLocation();
  const [userName, setUserName] = useState(location.state?.userName || "");

  return (
    <div className="flex bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen text-gray-100">
      <Sidebar userName={userName} />
      <div className="flex-1 ml-64">
        <Navbar className="ml-4" />
        <main className="p-8">
          <h2 className="text-3xl font-bold mb-8 text-white">
            Welcome Admin
          </h2>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <DashboardCard
              title="Total Questions"
              count="10"
              icon={<FaFileAlt className="text-cyan-400 text-4xl" />}
            />
            <DashboardCard
              title="Generated Papers"
              count="2"
              icon={<FaClipboardList className="text-teal-400 text-4xl" />}
            />
            <DashboardCard
              title="Total Users"
              count="4"
              icon={<FaClipboardList className="text-blue-400 text-4xl" />}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

const DashboardCard = ({ title, count, icon }) => (
  <div className="bg-[#1b2a38]/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-[#2d4d63] hover:border-teal-400 hover:shadow-teal-400/30 transition-all duration-300 flex items-center">
    <div className="mr-5">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold text-gray-200">{title}</h4>
      <p className="text-3xl font-bold text-white">{count}</p>
    </div>
  </div>
);

export default Dasboard;
