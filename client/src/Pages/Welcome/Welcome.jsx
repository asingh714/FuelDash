import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./Welcome.scss";

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="welcome-container">
      <h1 className="welcome-header fade-in">Welcome to FuelDash.</h1>
      <p className="welcome-text">
        Congratulations on taking a decisive step towards transforming the way
        you manage your gas station business. FuelDash Inc. is dedicated to
        empowering independent gas station owners like you with a user-friendly
        platform to organize daily sales data effortlessly. By bringing
        real-time analytics to your fingertips, we aim to fuel your
        business&apos;s growth and success. We&apos;re thrilled to have you
        aboard!
      </p>
      <Link to="/properties" className="welcome-btn">
        Get Started
      </Link>
    </div>
  );
};

export default Welcome;
