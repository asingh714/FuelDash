import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";

import newRequest from "../../utils/newRequest";
import "./loginForm.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let isValid = true;

      if (email === "" || !validator.isEmail(email)) {
        setEmailError(true);
        isValid = false;
      } else {
        setEmailError(false);
      }

      if (password === "") {
        setPasswordError(true);
        isValid = false;
      } else {
        setPasswordError(false);
      }

      if (isValid) {
        const res = await newRequest.post("/auth/login", {
          email,
          password,
        });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* include red-icon.svg in error message below*/}
      {error && (
        <p className="error-login-text">
          <img src="/red-icon.svg" alt="" />
          {error}
        </p>
      )}
      <label>Email</label>
      <input
        className={emailError ? "error" : ""}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        type="text"
      />
      {emailError && <p className="error-text">Email is required.</p>}
      <label>Password</label>
      <input
        className={passwordError ? "error" : ""}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
        type="password"
      />
      {passwordError && <p className="error-text">Password is required.</p>}
      <button type="submit">Login</button>

      <span className="signup-link" onClick={() => navigate("/signup")}>
        Don&apos;t have an account? <span id="darker">Create account →</span>
      </span>
    </form>
  );
};

export default LoginForm;
