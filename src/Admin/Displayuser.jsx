import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Displayuser() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    // Fetch all users
    useEffect(() => {
        axios.get("http://localhost:3001/Admin/users")
            .then((response) => setUsers(response.data))
            .catch((error) => console.error("Error fetching users:", error));
    }, []);

    // Handle edit button click
    const handleEdit = (user) => {
        setEditingUser(user);
    };

    // Handle form submission for updating user data
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:3001/Admin/users/${editingUser._id}`,
                editingUser
            );
            setUsers(users.map((user) => (user._id === editingUser._id ? response.data.user : user)));
            setEditingUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Handle input changes in the edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingUser({ ...editingUser, [name]: value });
    };

    // Handle delete button click
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/Admin/users/${id}`);
            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64">
                <Navbar />
                <main className="p-3 px-6">
                    <div className="p-6 border-2 border-gray-800 rounded-lg shadow-lg bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-300">
                        <h2 className="text-2xl font-bold mb-4 text-gray-900">User List</h2>
                        <table className="min-w-full bg-white border-2 border-gray-800 border-dashed rounded-lg">
                            <thead className="border-2 border-gray-800 border-dashed bg-gradient-to-r from-purple-300 to-indigo-300">
                                <tr>
                                    <th className="py-2 px-4 border-2 border-gray-800 border-dashed">Name</th>
                                    <th className="py-2 px-4 border-2 border-gray-800 border-dashed">Email</th>
                                    <th className="py-2 px-4 border-2 border-gray-800 border-dashed">Role</th>
                                    <th className="py-2 px-4 border-2 border-gray-800 border-dashed">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-indigo-50 text-center">
                                        <td className="py-2 px-4 border-2 border-gray-800 border-dashed">{user.name}</td>
                                        <td className="py-2 px-4 border-2 border-gray-800 border-dashed">{user.email}</td>
                                        <td className="py-2 px-4 border-2 border-gray-800 border-dashed">{user.role}</td>
                                        <td className="py-2 px-4 border-2 border-gray-800 border-dashed">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="bg-indigo-500 text-white py-2 px-2 rounded hover:bg-indigo-600 mr-2"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user._id)}
                                                className="bg-red-500 text-white py-2 px-2 rounded hover:bg-red-600"
                                            >
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Edit Form */}
                        {editingUser && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-300 p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-gray-800">
                                    <h3 className="text-xl font-bold mb-4 text-gray-900">Edit User</h3>
                                    <form onSubmit={handleUpdate}>
                                        <div className="mb-4">
                                            <label className="block text-sm text-black font-semibold">Name :</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={editingUser.name}
                                                onChange={handleInputChange}
                                                className="mt-1 p-2 w-full border-2 border-gray-800 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold text-black">Email :</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={editingUser.email}
                                                onChange={handleInputChange}
                                                className="mt-1 p-2 w-full border-2 border-gray-800 rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-semibold text-gray-700">Role</label>
                                            <select
                                                name="role"
                                                value={editingUser.role}
                                                onChange={handleInputChange}
                                                className="mt-1 p-2 w-full border-2 border-gray-800 rounded-md"
                                                required
                                            >
                                                <option value="Teacher">Teacher</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => setEditingUser(null)}
                                                className="border-2 border-red-500 text-red-500 font-semibold py-1 px-3 rounded hover:bg-red-500 hover:text-white mr-2"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="bg-indigo-500 text-white py-1 px-3 rounded hover:border-indigo-600 hover:border-2 hover:bg-transparent hover:text-indigo-600"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Displayuser;
