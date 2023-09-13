import LoginForm from "../../Components/LoginForm/LoginForm";
import LoginTestimonials from "../../Components/LoginTestimonials/LoginTestimonials";
import "./Login.scss";

const Login = () => {
  return (
    <div className="login-page-container">
      <h2 className="login-page-heading">Welcome Back</h2>
      <div className="login-page-content-container">
        <div className="left-container">
          <span>
            We are supercharging your gas station operations, one dashboard at a
            time.
          </span>
          <LoginForm />
        </div>
        <div className="right-container">
          <LoginTestimonials />
        </div>
      </div>
    </div>
  );
};

export default Login;
