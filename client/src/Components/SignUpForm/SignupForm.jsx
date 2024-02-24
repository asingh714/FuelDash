import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";
import { ThreeDots } from "react-loader-spinner";

import { useAuth } from "../../utils/AuthContext";
import "./signupForm.scss";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register, authError, isLoading, clearAuthError } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (authError) clearAuthError();
    // Update the state based on input name

    if (e.target.name === "name") {
      setName(e.target.value);
    }

    if (e.target.name === "email") {
      setEmail(e.target.value);
    }

    if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
      navigate("/welcome");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      {authError && (
        <p className="error-login-text">
          <img src="/red-icon.svg" alt="" />
          {authError}
        </p>
      )}
      <label>Name</label>
      <input
        className={authError ? "error" : ""}
        name="name"
        onChange={(e) => handleInputChange(e)}
        placeholder="Your name"
        type="text"
      />

      <label>Email</label>
      <input
        className={authError ? "error" : ""}
        name="email"
        onChange={(e) => handleInputChange(e)}
        placeholder="Your email"
        type="text"
      />

      <label>Password</label>
      <input
        className={authError ? "error" : ""}
        name="password"
        onChange={(e) => handleInputChange(e)}
        placeholder="Must be at least 6 characters."
        type="password"
      />

      <span id="terms">
        By clicking the button below, I agree to FuelDash&apos;s{" "}
        <Link className="agreements" to="/terms-of-use" target="_blank">
          Terms of Service
        </Link>{" "}
        and Privacy Policy, and acknowledge receipt of the Equal Credit
        Opportunity Act Notice.
      </span>
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
        <button type="submit">Continue</button>
      )}

      <span className="signup-link">
        Already registered?{" "}
        <span id="darker" onClick={() => navigate("/login")} target="_blank">
          Sign In
        </span>
      </span>
    </form>
  );
};

export default SignupForm;
