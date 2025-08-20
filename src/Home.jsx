import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FaFileAlt, FaClipboardList } from "react-icons/fa";

function Home() {
  const location = useLocation();
  const [userName, setUserName] = useState(location.state?.userName || "");

  return (
    <div className="flex">
      <Sidebar userName={userName} />
      <div className="flex-1 ml-64">
        <Navbar className="ml-4" />
        <main className="p-6">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Dashboard
          </h2>

          {/* Statistics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <DashboardCard
              title="Total Questions"
              count="10"
              icon={<FaFileAlt className="text-teal-500 text-3xl" />}
              gradient="from-teal-100 via-cyan-100 to-blue-100"
            />
            <DashboardCard
              title="Generated Papers"
              count="2"
              icon={<FaClipboardList className="text-blue-500 text-3xl" />}
              gradient="from-blue-100 via-sky-100 to-cyan-100"
            />
          </div>

          {/* Future Quick Actions (optional) */}
          {/* <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ActionCard title="Manage Questions" link="/questions" />
              <ActionCard title="Create Question Paper" link="/generate-paper" />
              <ActionCard title="View Reports" link="/reports" />
            </div>
          </div> */}
        </main>
      </div>
    </div>
  );
}

const DashboardCard = ({ title, count, icon, gradient }) => (
  <div
    className={`p-6 rounded-xl shadow-md flex items-center border-2 border-gray-800 bg-gradient-to-r ${gradient}`}
  >
    <div className="mr-4">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      <p className="text-2xl font-bold text-gray-900">{count}</p>
    </div>
  </div>
);

// Quick Action Card (future use)
const ActionCard = ({ title, link }) => (
  <Link
    to={link}
    className="bg-gradient-to-r from-teal-100 to-cyan-200 p-6 rounded-xl shadow-md text-center border-2 border-gray-800 hover:from-cyan-200 hover:to-blue-200 transition"
  >
    <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
  </Link>
);

export default Home;
