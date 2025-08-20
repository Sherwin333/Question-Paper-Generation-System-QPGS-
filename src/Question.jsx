import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const QuestionGenerator = () => {
    const [options, setOptions] = useState({});
    const [modules, setModules] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSemester, setSelectedSemester] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedModules, setSelectedModules] = useState([]);
    const [examType, setExamType] = useState("");
    const [num2m, setNum2m] = useState(0);
    const [num8m, setNum8m] = useState(0);
    const [num10m, setNum10m] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [userName, setUserName] = useState(location.state?.userName || "");

    // Fetch Select Options
    useEffect(() => {
        fetch("http://localhost:3001/select-options")
            .then((res) => res.json())
            .then((data) => setOptions(data))
            .catch((error) => console.error("❗ Error fetching options:", error));
    }, []);

    // Fetch Subjects
    useEffect(() => {
        if (selectedClass && selectedSemester) {
            fetch(`http://localhost:3001/subject?className=${selectedClass}&semester=${selectedSemester}`)
                .then((res) => res.json())
                .then((data) => {
                    setSelectedSubject("");
                    setOptions((prevOptions) => ({ ...prevOptions, subjects: data }));
                })
                .catch((error) => console.error("❗ Error fetching subjects:", error));
        }
    }, [selectedClass, selectedSemester]);

    // Fetch Modules
    useEffect(() => {
        if (selectedClass && selectedSubject) {
            fetch(`http://localhost:3001/modules?className=${encodeURIComponent(selectedClass)}&subject=${encodeURIComponent(selectedSubject)}`)
                .then((res) => res.json())
                .then((data) => {
                    setModules(Array.isArray(data) ? data : []);
                })
                .catch((error) => console.error("❗ Error fetching modules:", error));
        }
    }, [selectedClass, selectedSubject]);

    // Handle Question Generation
    const handleGenerateQuestions = async () => {
        const requestBody = {
            examType,
            className: selectedClass,
            semester: selectedSemester,
            subject: selectedSubject,
            modules: selectedModules,
            num2m: Number(num2m),
            num8m: Number(num8m),
            num10m: Number(num10m),
        };

        try {
            const response = await fetch("http://localhost:3001/generate-question", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const extractedQuestions = data.questions || [];

            if (extractedQuestions.length) {
                setQuestions(extractedQuestions);
                alert(`✅ Successfully generated ${extractedQuestions.length} questions!`);
            } else {
                alert("⚠️ No questions found for the selected criteria.");
                setQuestions([]);
            }
        } catch (error) {
            console.error("❗ Error generating questions:", error);
            alert("Error generating questions. Please try again.");
        }
    };

    return (
        <div className="flex">
            <Sidebar userName={userName} />
            <div className="flex-1 ml-64">
                <Navbar />
                <main className="p-6 m-6 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg border border-gray-300">
                    <div className="p-6">
                        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                            Question Paper Generator
                        </h1>

                        {/* Select Fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}
                                className="border-2 border-transparent bg-white rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-indigo-400">
                                <option value="">Select Class</option>
                                {options.classes?.map((className, idx) => (
                                    <option key={idx} value={className}>{className}</option>
                                ))}
                            </select>

                            <select value={selectedSemester} onChange={(e) => setSelectedSemester(e.target.value)}
                                className="border-2 border-transparent bg-white rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-indigo-400">
                                <option value="">Select Semester</option>
                                {options.semesters?.map((semester, idx) => (
                                    <option key={idx} value={semester}>{semester}</option>
                                ))}
                            </select>

                            <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}
                                className="border-2 border-transparent bg-white rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-indigo-400">
                                <option value="">Select Subject</option>
                                {options.subjects?.map((subject, idx) => (
                                    <option key={idx} value={subject}>{subject}</option>
                                ))}
                            </select>

                            <select value={examType} onChange={(e) => setExamType(e.target.value)}
                                className="border-2 border-transparent bg-white rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-indigo-400">
                                <option value="">Select Exam Type</option>
                                <option value="semester">Semester</option>
                                <option value="internal">Internal</option>
                            </select>
                        </div>

                        {/* Modules */}
                        <div className="mt-6">
                            <h2 className="text-lg font-bold text-gray-800">Select Modules:</h2>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {modules.map((module) => (
                                    <label key={module.id || module} className="flex items-center bg-white p-2 rounded-md shadow-sm cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={module}
                                            checked={selectedModules.includes(module)}
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                setSelectedModules((prev) =>
                                                    isChecked ? [...prev, module] : prev.filter((m) => m !== module)
                                                );
                                            }}
                                            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                        />
                                        <span className="ml-2 text-gray-700">{module}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Question Counts */}
                        <div className="mt-6 space-x-4">
                            <label className="font-semibold">2m:</label>
                            <input type="number" value={num2m} onChange={(e) => setNum2m(e.target.value)}
                                className="w-20 p-1 border rounded focus:ring-2 focus:ring-indigo-400" />

                            {examType === "semester" && (
                                <>
                                    <label className="font-semibold">8m:</label>
                                    <input type="number" value={num8m} onChange={(e) => setNum8m(e.target.value)}
                                        className="w-20 p-1 border rounded focus:ring-2 focus:ring-indigo-400" />
                                </>
                            )}

                            {examType === "internal" && (
                                <>
                                    <label className="font-semibold">10m:</label>
                                    <input type="number" value={num10m} onChange={(e) => setNum10m(e.target.value)}
                                        className="w-20 p-1 border rounded focus:ring-2 focus:ring-indigo-400" />
                                </>
                            )}
                        </div>

                        {/* Generate Button */}
                        <button
                            className="mt-6 px-6 py-2 rounded-lg font-semibold text-white shadow-md bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 transition"
                            onClick={handleGenerateQuestions}
                        >
                            🚀 Generate Questions
                        </button>

                        {/* Generated Questions */}
                        <div className="mt-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Generated Question Paper:</h2>
                            {questions.length > 0 ? (
                                <div className="p-6 rounded-xl bg-white shadow-md border border-gray-300">
                                    <div className="text-center">
                                        <h1 className="font-bold text-lg">ST JOSEPH ENGINEERING COLLEGE, MANGALORE</h1>
                                        <p className="italic text-sm">An Autonomous Institution</p>
                                    </div>
                                    <hr className="my-4 border-gray-400" />

                                    <table className="w-full border border-gray-300">
                                        <thead className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                                            <tr>
                                                <th className="border px-2 py-1">Q.No</th>
                                                <th className="border px-2 py-1">Question</th>
                                                <th className="border px-2 py-1">CO</th>
                                                <th className="border px-2 py-1">PO</th>
                                                <th className="border px-2 py-1">BL</th>
                                                <th className="border px-2 py-1">Marks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {questions.map((q, idx) => (
                                                <tr key={idx} className="text-center odd:bg-gray-50 even:bg-gray-100">
                                                    <td className="border px-2 py-1">{idx + 1}</td>
                                                    <td className="border px-2 py-1 text-left">{q.question || "❗ Missing Question"}</td>
                                                    <td className="border px-2 py-1">{q.co || "-"}</td>
                                                    <td className="border px-2 py-1">{q.po || "-"}</td>
                                                    <td className="border px-2 py-1">{q.bl || "-"}</td>
                                                    <td className="border px-2 py-1">{q.marks || "-"}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-red-500 font-medium">⚠️ No questions generated yet.</p>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default QuestionGenerator;
