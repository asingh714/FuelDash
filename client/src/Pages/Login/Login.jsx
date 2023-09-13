import LoginForm from "../../Components/LoginForm/LoginForm";
import "./Login.scss";

const Login = () => {
  return (
    <div className="loginPage">
      <div className="leftContainer">
        <h2>Welcome Back</h2>
        <span>
          We are supercharging your gas station operations, one dashboard at a
          time.
        </span>
        <LoginForm />
      </div>
      <div className="rightContainer"></div>
    </div>
  );
};

export default Login;
