import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Teacher");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    axios
      .post("http://localhost:3001/Admin/register", {
        name,
        email,
        password,
        confirmPassword,
        role,
      })
      .then((result) => {
        if (result.status === 201 || result.status === 200) {
          alert("✅ Registration successful!");
          navigate("/Admin/register");
        } else {
          alert("❗ Something went wrong. Please try again.");
        }
      })
      .catch(() => {
        setError("Registration failed. Please try again.");
      });
  };

  return (
    <div className="flex bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen text-gray-100">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Navbar />
        <main className="p-8">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-3xl p-8 bg-[#1b2a38]/80 backdrop-blur-lg rounded-2xl shadow-xl border border-fuchsia-500/40">
              <h2 className="text-3xl font-bold text-center mb-6 text-white">
                Register
              </h2>
              {error && (
                <div className="mb-4 text-red-400 text-center">{error}</div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-200"
                    >
                      Enter Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 p-3 w-full border border-fuchsia-400 rounded-md bg-gray-900/60 text-gray-100 focus:ring-2 focus:ring-fuchsia-500"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-200"
                    >
                      Email Address:
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="mt-1 p-3 w-full border border-fuchsia-400 rounded-md bg-gray-900/60 text-gray-100 focus:ring-2 focus:ring-teal-400"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Passwords */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-200"
                    >
                      Enter Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="mt-1 p-3 w-full border border-fuchsia-400 rounded-md bg-gray-900/60 text-gray-100 focus:ring-2 focus:ring-fuchsia-500"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-semibold text-gray-200"
                    >
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      className="mt-1 p-3 w-full border border-fuchsia-400 rounded-md bg-gray-900/60 text-gray-100 focus:ring-2 focus:ring-teal-400"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-semibold text-gray-200"
                  >
                    Select Role:
                  </label>
                  <select
                    id="role"
                    className="mt-1 p-3 w-full border border-fuchsia-400 rounded-md bg-gray-900/60 text-gray-100 focus:ring-2 focus:ring-teal-400"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="Teacher">Teacher</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-fuchsia-600 font-semibold shadow-lg text-white py-3 rounded-md hover:opacity-90 transition"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Register;
