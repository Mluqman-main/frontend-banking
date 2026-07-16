import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";


export default function UpdatePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmnewPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.newPassword || !formData.confirmnewPassword) {
      return setError("All fields are required.");
    }

    if (formData.newPassword.length < 8) {
      return setError("Password must be at least 8 characters.");
    }

    if (formData.newPassword !== formData.confirmnewPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      // If your api.js has baseURL = http://localhost:3000/api
      const res = await api.post("/api/auth/updatePassword", {
        newPassword: formData.newPassword,
      });

      toast.success(res.data.message || "Password updated successfully.");

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Update Password
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Enter your new password below.
        </p>

        {error && (
          <div className="mt-5 bg-red-100 border border-red-300 text-red-600 rounded-lg p-3">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmnewPassword"
              value={formData.confirmnewPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="mt-5 w-full text-blue-600 hover:underline"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}