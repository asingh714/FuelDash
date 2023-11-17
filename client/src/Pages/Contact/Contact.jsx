import { useState } from "react";

import newRequest from "../../utils/newRequest";
import Notification from "../../Components/Notification/Notification";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";

import "./Contact.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("hello");
    e.preventDefault();
    setError(null);
    setNotification(null);

    try {
      await newRequest.post("/contact/register", formData);
      setNotification({
        type: "success",
        message: "Your message has been sent successfully!",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setError("An error occurred while sending your message.");
      setNotification({
        type: "error",
        message: error.response?.data?.msg || "Failed to send message.",
      });
    }
  };

  return (
    <>
      <NavBar />
      <div className="contact-container">
        {notification && (
          <Notification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>
            Reach out for innovative fuel management solutions and expert advice
            tailored for your business.
          </p>
          <div className="contact-details">
            <p>🏠 123 Main St, New York City, NY 00000</p>
            <p>📞 +1 (800) 555-FUEL (3835)</p>
            <p>✉️ support@fueldash.com</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
          />
          <button type="submit" className="btn">
            Send message
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
