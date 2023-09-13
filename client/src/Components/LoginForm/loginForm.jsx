import { useState } from "react";

import "./loginForm.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (email === "") {
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
      // Your login logic here
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        className={emailError ? "error" : ""}
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        type="email"
      />
      {emailError && <p className="error-text">Email is required.</p>}
      <label>Password</label>
      <input
        className={emailError ? "error" : ""}
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
        type="password"
      />
      {passwordError && <p className="error-text">Password is required.</p>}
      <button type="submit">Login</button>

      <span className="signup-link">
        Don&apos;t have an account? <span id="darker">Create account →</span>
      </span>
    </form>
  );
};

export default LoginForm;
