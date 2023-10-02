import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import { ThreeDots } from "react-loader-spinner";

import newRequest from "../../utils/newRequest";
import "./loginForm.scss";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const delayedLogin = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const res = await newRequest.post("/auth/login", {
          email,
          password,
        });
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        navigate("/dashboard");
      } catch (error) {
        setError(error.response.data.msg);
      }
      setLoading(false);
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    delayedLogin();
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
      {loading ? (
        <ThreeDots
          height="20"
          width="30"
          radius="10"
          color="#fff"
          ariaLabel="three-dots-loading"
          visible={true}
          wrapperStyle={{
            "background-color": "black",
            width: "7.2rem",
            padding: "0.5rem 0rem",
            "border-radius": "1.5rem",
            display: "flex",
            "justify-content": "center",
            "margin-top": "2.5rem",
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
