import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from "validator";

import "./signupForm.scss";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;

    if (name === "") {
      setNameError(true);
      isValid = false;
    } else {
      setNameError(false);
    }

    if (email === "" || !validator.isEmail(email)) {
      setEmailError(true);
      isValid = false;
    } else {
      setEmailError(false);
    }

    if (password === "" || password.length < 6) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (isValid) {
      // Your signup logic here
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <label>Name</label>
      <input
        className={nameError ? "error" : ""}
        name="name"
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        type="text"
      />
      {nameError && <p className="error-text">Name is required.</p>}
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
        placeholder="Must be at least 6 characters."
        type="password"
      />
      {passwordError && <p className="error-text">Password is required.</p>}

      <span id="terms">
        By clicking the button below, I agree to FuelDash&apos;s{" "}
        <Link className="agreements" to="/terms-of-use" target="_blank">
          Terms of Service
        </Link>{" "}
        and Privacy Policy, and acknowledge receipt of the Equal Credit
        Opportunity Act Notice.
      </span>

      <button type="submit">Continue</button>

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
