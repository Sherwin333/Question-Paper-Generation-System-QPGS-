import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AddSubjects = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [newSubjects, setNewSubjects] = useState("");
  const [userName, setUserName] = useState(location.state?.userName || "");

  // Define semesters based on selected class
  const semesterOptions = {
    "MCA I": ["Semester 1", "Semester 2"],
    "MCA II": ["Semester 3", "Semester 4"],
  };

  // Handle Adding Subjects
  const addSubjects = () => {
    if (!selectedClass || !selectedSemester || !newSubjects) {
      alert("Please fill all fields!");
      return;
    }

    const subjectsArray = newSubjects.split(",").map((s) => s.trim());

    axios
      .post("http://localhost:3001/Admin/subjects", {
        className: selectedClass,
        semester: selectedSemester,
        subjects: subjectsArray,
      })
      .then(() => {
        alert("Subjects added successfully!");
        setNewSubjects("");
      })
      .catch((err) =>
        alert(err.response?.data?.message || "Error adding subjects")
      );
  };

  return (
    <div className="flex bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen text-gray-100">
      <Sidebar userName={userName} />
      <div className="flex-1 ml-64">
        <Navbar className="ml-4" />
        <main className="p-8">
          <div className="p-8 bg-[#1b2a38]/80 backdrop-blur-lg rounded-2xl shadow-xl border border-fuchsia-500/40">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Select Class & Semester
            </h2>

            {/* Class Selection */}
            <label className="block mb-2 font-semibold text-gray-200">
              Select Class:
            </label>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedSemester(""); // Reset semester when class changes
              }}
              className="border border-fuchsia-400 rounded-md p-2 mb-6 w-full bg-gray-900/60 text-gray-100 focus:ring-2 focus:ring-fuchsia-500"
            >
              <option value="">-- Select Class --</option>
              <option value="MCA I">MCA I</option>
              <option value="MCA II">MCA II</option>
            </select>

            {/* Semester Selection */}
            <label className="block mb-2 font-semibold text-gray-200">
              Select Semester:
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="p-2 mb-6 w-full border border-fuchsia-400 rounded-md bg-gray-900/60 text-gray-100 focus:ring-2 focus:ring-teal-400"
              disabled={!selectedClass}
            >
              <option value="">-- Select Semester --</option>
              {selectedClass &&
                semesterOptions[selectedClass].map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
            </select>

            {/* Add New Subjects */}
            <div className="mt-4">
              <label className="block mb-2 font-semibold text-gray-200">
                Add New Subjects:
              </label>
              <textarea
                type="text"
                cols="10"
                rows="5"
                value={newSubjects}
                placeholder="Enter subjects (comma separated)"
                onChange={(e) => setNewSubjects(e.target.value)}
                className="p-3 rounded-md border border-fuchsia-400 w-full bg-gray-900/60 text-gray-100 focus:ring-2 focus:ring-teal-400"
              />
              <button
                onClick={addSubjects}
                className="bg-gradient-to-r from-teal-500 to-fuchsia-600 font-semibold hover:opacity-90 transition cursor-pointer mt-6 text-white px-6 py-2 rounded-md shadow-lg"
                disabled={!selectedClass || !selectedSemester}
              >
                Add Subjects
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddSubjects;
