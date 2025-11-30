import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { FaCamera } from "react-icons/fa";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const url = "http://localhost:5000/api/v1/auth";

  // Fetch user profile on component mount
  const getProfile = async () => {
    try {
      setLoading(true);
      setError("");

      // Retrieve user data from localStorage
      const userData = localStorage.getItem("user");
      if (!userData) {
        setError("User not logged in");
        setLoading(false);
        navigate("/login");
        return;
      }

      const user = JSON.parse(userData);
      const userId = user.id || user._id;

      if (!userId) {
        setError("User ID not found");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${url}/${userId}`);

      if (response.data.user) {
        setProfile(response.data.user);
      } else {
        setError("Error fetching profile");
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response?.status === 401) {
        setError("Session expired, please log in again");
        localStorage.removeItem("user");
        navigate("/login");
      } else if (error.response?.status === 404) {
        setError("Profile not found");
      } else {
        setError("Server error while fetching profile");
      }
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (updatedData) => {
    try {
      setLoading(true);
      const userData = localStorage.getItem("user");
      const user = JSON.parse(userData);
      const userId = user.id || user._id;

      const response = await axios.put(`${url}/profile/${userId}`, updatedData);

      if (response.data.success) {
        setProfile(response.data.user);

        const updatedUser = { ...user, ...response.data.user };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        return true;
      }
      return false;
    } catch (error) {
      console.error("Update error:", error);
      setError("Error updating profile");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Display loading screen
  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  // Display error screen
  if (error) {
    return (
      <div className="profile-container">
        <div className="error-message">
          {error}
          <button onClick={() => navigate("/login")} className="login-btn">
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Welcome back, {profile?.name ? profile.name.split(' ')[0] : 'Friend'}! 👋</h1>
        <p className="welcome-message">We're glad to see you again</p>
      </div>

      {profile && (
        <div className="profile-content">
          <div className="profile-card">
            {/* Avatar + upload button */}
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar">
                {profile.image ? (
                  <img src={profile.image} alt="Profile" />
                ) : (
                  <span>
                    {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
                  </span>
                )}
              </div>

              <button className="upload-btn">
                <FaCamera />
              </button>
            </div>

            {/* Profile Info */}
            <div className="profile-info">
              <div className="info-group">
                <label>Full Name</label>
                <p>{profile.name || "Not provided"}</p>
              </div>

              <div className="info-group">
                <label>Email</label>
                <p>{profile.email}</p>
              </div>

              <div className="info-group">
                <label>Role</label>
                <p className={`role ${profile.role}`}>
                  {profile.role === "admin" ? "Administrator" : "User"}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="profile-actions">
              <button
                onClick={() => navigate("/edit-profile")}
                className="edit-btn"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/order")}
                className="orders-btn"
              >
                My Orders
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;