import { useState } from "react";

import "./loginForm.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  return (
    <form className="login-form">
      <label>Email</label>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        type="email"
      />
      <label>Password</label>
      <input
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
        type="password"
      />
      <button type="submit">Login</button>

      <span className="signup-link">
        Don&apos;t have an account? <span id="darker">Create account →</span>
      </span>
    </form>
  );
};

export default LoginForm;
