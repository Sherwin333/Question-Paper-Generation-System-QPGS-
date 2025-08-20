import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf"; // Import jsPDF
import { FaDownload } from "react-icons/fa";

const QuestionPapersTable = () => {
  const [questionPapers, setQuestionPapers] = useState([]);
  const location = useLocation();
  const [userName, setUserName] = useState(location.state?.userName || "");

  // Fetch data from the backend
  useEffect(() => {
    const fetchQuestionPapers = async () => {
      try {
        const response = await fetch("http://localhost:3001/get-question-papers");
        const data = await response.json();
        setQuestionPapers(data);
      } catch (error) {
        console.error("Error fetching question papers:", error);
      }
    };

    fetchQuestionPapers();
  }, []);

  // Function to handle PDF download
  const handleDownload = (paper) => {
    const doc = new jsPDF();

    // Add subject, exam type, internal type, semester, and class
    doc.setFontSize(16);
    doc.text(`Subject: ${paper.subject}`, 10, 20);
    doc.text(`Exam Type: ${paper.examType}`, 10, 30);
    if (paper.examType === "internal") {
      doc.text(`Internal Type: ${paper.internalType}`, 10, 40);
    }
    doc.text(`Semester: ${paper.semester}`, 10, 50);
    doc.text(`Class: ${paper.className}`, 10, 60);

    // Add questions
    let yOffset = 70; // Starting Y position for questions
    doc.setFontSize(12);
    paper.questions.forEach((q, index) => {
      doc.text(`Q${index + 1}: ${q.question}`, 10, yOffset);
      doc.text(`Module Type: ${q.moduleType}`, 10, yOffset + 10);
      doc.text(
        `CO: ${q.co}, PO: ${q.po}, BL: ${q.bl}, Marks: ${q.marks}`,
        10,
        yOffset + 20
      );
      yOffset += 30; // Increase Y offset for the next question
    });

    // Save the PDF
    doc.save(`${paper.subject}_${paper.examType}_${paper.internalType || ""}.pdf`);
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-100 via-indigo-50 to-gray-200 min-h-screen">
      <Sidebar userName={userName} />
      <div className="flex-1 ml-64 p-4">
        <Navbar className="ml-4" />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">📄 Question Papers</h2>
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table className="min-w-full bg-white border border-gray-200 rounded-xl">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="py-3 px-4 border">SL No</th>
                  <th className="py-3 px-4 border">Class</th>
                  <th className="py-3 px-4 border">Semester</th>
                  <th className="py-3 px-4 border">Subject</th>
                  <th className="py-3 px-4 border">Exam Type</th>
                  {questionPapers.some((paper) => paper.examType === "internal") && (
                    <th className="py-3 px-4 border">Internal Type</th>
                  )}
                  <th className="py-3 px-4 border">Download</th>
                </tr>
              </thead>
              <tbody>
                {questionPapers.map((paper, index) => (
                  <tr
                    key={paper._id}
                    className="hover:bg-indigo-50 transition duration-150"
                  >
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">{paper.className}</td>
                    <td className="py-2 px-4 border text-center">{paper.semester}</td>
                    <td className="py-2 px-4 border">{paper.subject}</td>
                    <td className="py-2 px-4 border capitalize text-center">
                      {paper.examType}
                    </td>
                    {paper.examType === "internal" ? (
                      <td className="py-2 px-4 border text-center">{paper.internalType}</td>
                    ) : (
                      <td className="py-2 px-4 border text-center">-</td>
                    )}
                    <td className="py-2 px-4 border text-center">
                      <button
                        onClick={() => handleDownload(paper)}
                        className="flex items-center justify-center space-x-2 px-4 py-2 
                          bg-gradient-to-r from-green-600 to-green-800 text-white 
                          rounded-lg shadow-md hover:shadow-lg 
                          hover:from-green-500 hover:to-green-700 transition"
                      >
                        <FaDownload />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuestionPapersTable;
