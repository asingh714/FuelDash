import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import newRequest from "../../utils/newRequest";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import Modal from "../../Components/Modal/Modal";
import "./Profile.scss";

const Profile = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const navigate = useNavigate();

  const { loading, error, data } = useQuery([], async () => {
    const response = await newRequest.get(`/user`);
    if (!response.data) {
      throw new Error("No profile returned");
    }
    setFormData({
      name: response.data.name,
      email: response.data.email,
    });
    return response.data;
  });

  const handleLogout = async () => {
    try {
      const response = await newRequest.post("/auth/logout");
      if (response.status === 200) {
        localStorage.removeItem("currentUser");
        navigate("/");
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement update logic
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="profile-page-container">
      <DashboardMenu />
      <div className="profile-container">
        <hr />
        <h4>Personal Information</h4>
        <span>This information will not be displayed publicly.</span>
        <div className="input-container">
          <div className="input-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className="button update-button"
          disabled={
            formData.name === data?.name && formData.email === data?.email
          }
        >
          Update User Info
        </button>

        <span>Subscription Status: {data?.subscriptionStatus}</span>

        <hr />
        <div className="button-container">
          <div
            onClick={() => {
              setModalType("delete");
              setDeleteModalOpen(true);
            }}
            className="button delete-button"
          >
            Delete Account
          </div>
          <div
            onClick={() => {
              setModalType("password");
              setPasswordModalOpen(true);
            }}
            className="button pw-button"
          >
            Change Password
          </div>

          <div
            onClick={() => {
              setModalType("logout");
              setLogoutModalOpen(true);
            }}
            className="button logout-button"
          >
            Logout
          </div>
        </div>
        {data?.subscriptionStatus === "Free" && <button>Subscribe</button>}
      </div>
      {(isPasswordModalOpen || isDeleteModalOpen || isLogoutModalOpen) && (
        <Modal
          type={modalType}
          onClose={() => {
            setPasswordModalOpen(false);
            setDeleteModalOpen(false);
            setLogoutModalOpen(false);
          }}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default Profile;
