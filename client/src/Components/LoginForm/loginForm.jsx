import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

import { useAuth } from "../../utils/AuthContext";

import "./loginForm.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, authError, isLoading, clearAuthError } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    if (authError) clearAuthError();
    // Update the state based on input name

    if (e.target.name === "email") {
      setEmail(e.target.value);
    }

    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {authError && (
        <p className="error-login-text">
          <img src="/red-icon.svg" alt="" />
          {authError}
        </p>
      )}
      <label>Email</label>
      <input
        className={authError ? "error" : ""}
        name="email"
        onChange={(e) => handleInputChange(e)}
        placeholder="Your email"
        type="text"
        disabled={isLoading}
      />

      <label>Password</label>
      <input
        className={authError ? "error" : ""}
        name="password"
        onChange={(e) => handleInputChange(e)}
        placeholder="Your password"
        type="password"
        disabled={isLoading}
      />

      {isLoading ? (
        <ThreeDots
          height="20"
          width="30"
          radius="10"
          color="#fff"
          ariaLabel="three-dots-loading"
          visible={true}
          wrapperStyle={{
            backgroundColor: "black",
            width: "7.2rem",
            padding: "0.5rem 0rem",
            borderRadius: "1.5rem",
            display: "flex",
            justifyContent: "center",
            marginTop: "2.5rem",
          }}
        />
      ) : (
        <button type="submit">Log in</button>
      )}

      <span className="signup-link" onClick={() => navigate("/signup")}>
        Don&apos;t have an account? <span id="darker">Create account →</span>
      </span>
    </form>
  );
};

export default LoginForm;
