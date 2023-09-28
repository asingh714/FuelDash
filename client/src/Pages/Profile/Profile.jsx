import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import newRequest from "../../utils/newRequest";
import DashboardMenu from "../../Components/DashboardMenu/DashboardMenu";
import Modal from "../../Components/Modal/Modal";
import "./Profile.scss";

const Profile = () => {
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);

  const { loading, error, data } = useQuery([], async () => {
    const response = await newRequest.get(`/user`);
    if (!response.data) {
      throw new Error("No profile returned");
    }
    console.log(response.data);
    return response.data;
  });

  // State for form inputs
  const [formData, setFormData] = useState({
    name: data?.name,
    email: data?.email,
    password: "",
    newPassword: "",
  });

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
        <hr />
        <div className="button-container">
          <button onClick={() => setPasswordModalOpen(true)}>
            Change Password
          </button>
          <button onClick={() => setDeleteModalOpen(true)}>
            Delete Account
          </button>
          <button
            onClick={() => setUpdateModalOpen(true)}
            // disabled={name === data.name && email === data.email}
          >
            Update User Info
          </button>
        </div>
        {data?.subscriptionStatus === "Free" && <button>Subscribe</button>}
        {isPasswordModalOpen && <Modal message="Change password" />}
        <p>Subscription Status: {data?.subscriptionStatus}</p>
      </div>
    </div>
  );
};

export default Profile;
