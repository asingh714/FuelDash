import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import newRequest from "../../utils/newRequest";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import Modal from "../../Components/Modal/Modal";
import Notification from "../../Components/Notification/Notification";
import "./Profile.scss";

const Profile = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [notification, setNotification] = useState({
    message: "",
    type: "success",
  });

  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem("currentUser")) || ""
  );

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
  const handlePasswordChange = async (currentPassword, newPassword) => {
    try {
      const response = await newRequest.patch("/user/updatePassword", {
        currentPassword,
        newPassword,
      });
      if (response.status === 200) {
        setNotification({
          message: "User password updated successfully!",
          type: "success",
        });
      } else {
        setNotification({
          message: "Error updating user info.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await newRequest.patch(`/user/updateUser`, formData);
      if (response.status === 200) {
        setNotification({
          message: "User info updated successfully!",
          type: "success",
        });
      } else {
        setNotification({
          message: "Error updating user info.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await newRequest.delete(
        `/user/${currentUser.user.userId}`
      );
      if (response.status === 200) {
        setNotification({
          message: "User deleted successfully.",
          type: "success",
        });

        localStorage.removeItem("currentUser");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setNotification({
          message: "Error deleting user info.",
          type: "error",
        });
      }
    } catch (error) {
      setNotification({
        message: "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  const handleModalConfirm = (currentPassword, newPassword) => {
    if (modalType === "logout") {
      handleLogout();
    } else if (modalType === "changePassword") {
      handlePasswordChange(currentPassword, newPassword);
    } else if (modalType === "deleteUser") {
      handleDeleteUser();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="profile-page-container">
      <DashboardMenu />
      <div className="profile-container">
        {notification.message && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification({ message: "" })}
          />
        )}
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
          onClick={handleUpdateUser}
        >
          Update User Info
        </button>

        <span>Subscription Status: {data?.subscriptionStatus}</span>

        <hr />
        <div className="button-container">
          {data?.subscriptionStatus === "Free" && (
            <div className="button subscribe-button ">Subscribe</div>
          )}
          <div
            onClick={() => {
              setModalType("deleteUser");
              setModalOpen(true);
            }}
            className="button delete-button"
          >
            Delete Account
          </div>
          <div
            onClick={() => {
              setModalType("changePassword");
              setModalOpen(true);
            }}
            className="button pw-button"
          >
            Change Password
          </div>

          <div
            onClick={() => {
              setModalType("logout");
              setModalOpen(true);
            }}
            className="button logout-button"
          >
            Logout
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          type={modalType}
          user={currentUser}
          onClose={() => {
            setModalOpen(false);
          }}
          onConfirm={handleModalConfirm}
        />
      )}
    </div>
  );
};

export default Profile;
