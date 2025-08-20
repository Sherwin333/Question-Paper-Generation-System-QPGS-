import React, { useState, useEffect } from "react";
import { FaTimes, FaTrash } from "react-icons/fa";

const QuestionModal = ({ closeModal }) => {
  const [examType, setExamType] = useState("");
  const [internalType, setInternalType] = useState("");
  const [semester, setSemester] = useState("");
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", moduleType: "", co: "", po: "", bl: "", marks: "" },
  ]);

  const [classes, setClasses] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Fetch Classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:3001/classes");
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  // Fetch Semesters when Class is Selected
  useEffect(() => {
    if (className) {
      const fetchSemesters = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/semesters?className=${className}`
          );

          if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return;
          }

          const data = await response.json();
          setSemester("");
          setSubjects([]);
          setSemesters(data);
        } catch (error) {
          console.error("Error fetching semesters:", error);
        }
      };
      fetchSemesters();
    }
  }, [className]);

  // Fetch Subjects when Class & Semester are Selected
  useEffect(() => {
    if (className && semester) {
      const fetchSubjects = async () => {
        try {
          const response = await fetch(
            `http://localhost:3001/subjects?className=${className}&semester=${semester}`
          );
          const data = await response.json();
          setSubjects(data);
        } catch (error) {
          console.error("Error fetching subjects:", error);
        }
      };
      fetchSubjects();
    }
  }, [className, semester]);

  // Module Types
  const moduleTypes = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5"];

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", moduleType: "", co: "", po: "", bl: "", marks: "" },
    ]);
  };

  const deleteQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    } else {
      alert("At least one question is required!");
    }
  };

  const handleInputChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !examType ||
      !semester ||
      !className ||
      !subject ||
      (examType === "internal" && !internalType)
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    const requestData = { examType, semester, className, internalType, subject, questions };

    try {
      const response = await fetch("http://localhost:3001/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message || "Error generating questions");
      } else {
        alert("Questions saved successfully!");
        closeModal();
      }
    } catch (error) {
      console.error("Error submitting questions:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 p-4 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-[750px] max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 relative">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-red-100 transition"
        >
          <FaTimes className="text-red-500 text-xl" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-gray-800">Generate Questions</h2>

        {/* Exam Type */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Exam Type:</label>
          <select
            value={examType}
            onChange={(e) => {
              setExamType(e.target.value);
              setInternalType("");
            }}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select Exam Type</option>
            <option value="internal">Internal</option>
            <option value="semester">Semester</option>
          </select>
        </div>

        {/* Internal Type */}
        {examType === "internal" && (
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">Internal Type:</label>
            <select
              value={internalType}
              onChange={(e) => setInternalType(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Internal</option>
              <option value="internal1">Internal 1</option>
              <option value="internal2">Internal 2</option>
            </select>
          </div>
        )}

        {/* Class */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Class:</label>
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Choose Class</option>
            {classes.map((cls, idx) => (
              <option key={idx} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Semester */}
        {semesters.length > 0 && (
          <div className="mb-4">
            <label className="block font-medium mb-1">Semester:</label>
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Choose Semester</option>
              {semesters.map((sem, idx) => (
                <option key={idx} value={sem}>
                  {sem}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Subject */}
        {subjects.length > 0 && (
          <div className="mb-4">
            <label className="block font-medium mb-1">Subject:</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Choose Subject</option>
              {subjects.map((sub, idx) => (
                <option key={idx} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Questions */}
        {questions.map((q, index) => (
          <div
            key={index}
            className="mb-4 border p-4 rounded-lg bg-gray-50 relative shadow-sm"
          >
            <button
              onClick={() => deleteQuestion(index)}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-red-100"
            >
              <FaTrash className="text-red-500 text-sm" />
            </button>

            <label className="block font-medium">Module Type:</label>
            <select
              value={q.moduleType}
              onChange={(e) => handleInputChange(index, "moduleType", e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
            >
              <option value="">Select Module</option>
              {moduleTypes.map((module, idx) => (
                <option key={idx} value={module}>
                  {module}
                </option>
              ))}
            </select>

            <label className="block font-medium">Question:</label>
            <input
              type="text"
              value={q.question}
              onChange={(e) => handleInputChange(index, "question", e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Enter question"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={q.co}
                onChange={(e) => handleInputChange(index, "co", e.target.value)}
                className="p-2 border rounded-lg"
                placeholder="Enter CO"
              />
              <input
                type="text"
                value={q.po}
                onChange={(e) => handleInputChange(index, "po", e.target.value)}
                className="p-2 border rounded-lg"
                placeholder="Enter PO"
              />
              <input
                type="text"
                value={q.bl}
                onChange={(e) => handleInputChange(index, "bl", e.target.value)}
                className="p-2 border rounded-lg"
                placeholder="Enter BL"
              />
              <select
                value={q.marks}
                onChange={(e) => handleInputChange(index, "marks", e.target.value)}
                className="p-2 border rounded-lg"
              >
                <option value="">Select Marks</option>
                {examType === "internal" ? (
                  <>
                    <option value="2m">2m</option>
                    <option value="10m">10m</option>
                  </>
                ) : (
                  <>
                    <option value="2m">2m</option>
                    <option value="8m">8m</option>
                  </>
                )}
              </select>
            </div>
          </div>
        ))}

        {/* Add Question */}
        <button
          onClick={addQuestion}
          className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow hover:opacity-90 transition"
        >
          + Add Question
        </button>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full mt-3 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow hover:opacity-90 transition"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default QuestionModal;
