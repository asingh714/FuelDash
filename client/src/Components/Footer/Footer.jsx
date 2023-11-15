import { useState } from "react";

import Notification from "../Notification/Notification";
import newRequest from "../../utils/newRequest";

import "./Footer.scss";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await newRequest.post("/subscribe", { email });
      setIsSubscribed(true);
      setNotification({
        type: "success",
        message: "Subscription successful! Thank you for subscribing.",
      });
      setEmail("");
    } catch (error) {
      setError(error.response.data.msg);
      setNotification({ type: "error", message: error.response.data.msg });
    }
  };
  return (
    <>
      <footer className="fueldash-footer">
        <div className="newsletter-section">
          <h2>Stay Updated with FuelDash</h2>
          <p>
            Join our newsletter and get the latest on gas station management
            tips, updates, and industry news every month.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className={error ? "error" : ""}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              type="text"
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <div className="footer-nav">
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li>
                <a href="/about">Our Story</a>
              </li>
              <li>
                <a href="/team">Team</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Explore</h4>
            <ul>
              <li>
                <a href="/blog">Blog</a>
              </li>
              <li>
                <a href="/customers">Customers</a>
              </li>
              <li>
                <a href="/faqs">FAQs</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href="/contact">Get in Touch</a>
              </li>
              <li>
                <a href="/support">Support</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  );
};

export default Footer;
