import LoginTestimonials from "../../Components/LoginTestimonials/LoginTestimonials";
import "./SignUp.scss";
const SignUp = () => {
  return (
    <div className="signup-page">
      <div className="signup-page-container">
        <h2 className="login-page-heading">
          Welcome, let&apos;s create an account
        </h2>
        <div className="signup-page-content-container">
          <span>
            FuelDash turns your daily sales into real-time insights for
            immediate action. Say goodbye to guesswork and hello to data-driven
            decisions that drive growth.
          </span>
        </div>
        <div className="right-container">
          <LoginTestimonials />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
