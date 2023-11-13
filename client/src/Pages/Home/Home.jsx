import { Link } from "react-router-dom";

import NavBar from "../../Components/NavBar/NavBar";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home-page-container">
      <NavBar />
      <main>
        <section id="hero">
          <h1>
            Fuel Your Business
            <br />
            with Smarter Decisions
          </h1>
          <p>
            Say goodbye to guesswork and hello to clarity. Our intuitive
            dashboard transforms complex data into actionable insights,
            empowering you to boost profitability and drive growth.
          </p>
          <div className="hero-btns">
            <Link to="/signup" className="get-started-btn">
              Get Started
            </Link>
            <Link to="/" className="learn-more-btn">
              Learn more →
            </Link>
          </div>
        </section>
      </main>

      <section id="dashboard-preview">
        <img
          src="./dashboard.png"
          alt="FuelDash Dashboard Preview"
          className="dashboard-image"
        />
      </section>
    </div>
  );
};

export default Home;
