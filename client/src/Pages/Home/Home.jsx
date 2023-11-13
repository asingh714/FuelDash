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

      <section id="trusted-by">
        <h4>The most innovative small businesses trust FuelDash</h4>
        <div className="logos">
          <img
            src="./brand-logo-1.png"
            alt="Brand Logo 1"
            className="brand-logo"
          />
          <img
            src="./brand-logo-2.png"
            alt="Brand Logo 2"
            className="brand-logo"
          />
          <img
            src="./brand-logo-3.png"
            alt="Brand Logo 3"
            className="brand-logo"
          />
          <img
            src="./brand-logo-4.png"
            alt="Brand Logo 4"
            className="brand-logo"
          />
          <img
            src="./brand-logo-5.png"
            alt="Brand Logo 5"
            className="brand-logo"
          />
        </div>
      </section>

      <section id="features">
        <div className="features-intro">
          <span>Organize your business</span>
          <h2>Everything you need to optimize your gas station</h2>
          <p>
            Streamline operations, maximize profits, and get insights at a
            glance. FuelDash is the ultimate dashboard for independent gas
            station owners.
          </p>
        </div>
        <sdiv className="features-boxes">
          <div className="feature">
            <img
              src="path-to-your-icon"
              alt="Real-time Analytics"
              className="feature-icon"
            />
            <h3>Real-time Analytics</h3>
            <p>
              Track sales as they happen. Get up-to-the-minute data on fuel
              sales, inventory levels, and customer trends.
            </p>
            <Link to="/" className="learn-more-btn">
              Learn more →
            </Link>
          </div>
          <div className="feature">
            <img
              src="path-to-your-icon"
              alt="Inventory Management"
              className="feature-icon"
            />
            <h3>Inventory Management</h3>
            <p>
              Never run out of stock again. Our intelligent system predicts your
              inventory needs based on historical data and trends.
            </p>
            <Link to="/" className="learn-more-btn">
              Learn more →
            </Link>
          </div>
          <div className="feature">
            <img
              src="path-to-your-icon"
              alt="Payment Processing"
              className="feature-icon"
            />
            <h3>Payment Processing</h3>
            <p>
              Accept payments quickly and securely. Understand your revenue
              streams with breakdowns by payment type.
            </p>
            <Link to="/" className="learn-more-btn">
              Learn more →
            </Link>
          </div>
          <div className="feature">
            <img
              src="path-to-your-icon"
              alt="Sales Reports"
              className="feature-icon"
            />
            <h3>Sales Reports</h3>
            <p>
              Detailed reports to help you understand what’s selling, what’s
              not, and how to improve.
            </p>
            <Link to="/" className="learn-more-btn">
              Learn more →
            </Link>
          </div>
          <div className="feature">
            <img
              src="path-to-your-icon"
              alt="Customer Insights"
              className="feature-icon"
            />
            <h3>Customer Insights</h3>
            <p>
              Get to know your customers better. Learn about their buying habits
              and preferences to tailor their experience.
            </p>
            <Link to="/" className="learn-more-btn">
              Learn more →
            </Link>
          </div>
        </sdiv>
      </section>
    </div>
  );
};

export default Home;
