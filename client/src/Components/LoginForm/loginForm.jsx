import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  return (
    <form className="loginForm">
      <label>Email:</label>
      <input
        name="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        type="email"
      />
      <label>Password:</label>
      <input
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Your password"
        type="password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
