import { Link } from "react-router-dom";

import NavBar from "../../Components/NavBar/NavBar";

import "./Home.scss";
import Footer from "../../Components/Footer/Footer";

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
            <Link to="/about" className="learn-more-btn">
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
        <div className="features-boxes">
          <div className="feature">
            <img
              src="./Analytics.png"
              alt="Real-time Analytics"
              className="feature-icon"
            />
            <h3>Real-time Analytics</h3>
            <p>
              Track sales as they happen. Get up-to-the-minute data on fuel
              sales, inventory levels, and customer trends.
            </p>
            <Link to="/about" className="learn-more-btn">
              Learn more →
            </Link>
          </div>
          <div className="feature">
            <img
              src="./Management.png"
              alt="Inventory Management"
              className="feature-icon"
            />
            <h3>Inventory Management</h3>
            <p>
              Never run out of stock again. Our intelligent system predicts your
              inventory needs based on historical data and trends.
            </p>
            <Link to="/about" className="learn-more-btn">
              Learn more →
            </Link>
          </div>

          <div className="feature">
            <img
              src="./Sales.png"
              alt="Sales Reports"
              className="feature-icon"
            />
            <h3>Sales Reports</h3>
            <p>
              Detailed reports to help you understand what’s selling, what’s
              not, and how to improve.
            </p>
            <Link to="/about" className="learn-more-btn">
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      <section id="sales-management">
        <div className="container">
          <div className="text-content">
            <span>Everything you need</span>
            <h2>Manage Your Sales Seamlessly</h2>
            <p>
              With FuelDash, stay on top of your sales data without the hassle.
              Our platform simplifies complex analytics into actionable
              insights.
            </p>
          </div>

          <div className="sales-data-container">
            <img src="./Sales_Data.png" alt="" className="sales-data-img" />
            <div className="sales-data-overlay"></div>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <img src="./real-time.svg" alt="Real-time Tracking" />
              <p>
                <span className="bold">Real-time Tracking. </span>
                Monitor sales as they happen, and adjust your strategy on the
                fly for maximum efficiency and profitability.
              </p>
            </div>
            <div className="feature-item">
              <img src="./analytics.svg" alt="In-Depth Analytics" />
              <p>
                <span className="bold">In-Depth Analytics. </span>
                Dig deep into your sales data with comprehensive analytics that
                help you understand trends and customer behavior.
              </p>
            </div>
            <div className="feature-item">
              <img src="./reports.svg" alt="Detailed Reports" />
              <p>
                <span className="bold">Detailed Reports. </span>
                Access detailed reports that give you a clear view of your
                business performance over time.
              </p>
            </div>
            <div className="feature-item">
              <img src="./customer.svg" alt="Customer Insights" />
              <p>
                <span className="bold">Customer Insights. </span>
                Get to know your customers better. Our platform provides
                insights into buying patterns and preferences.
              </p>
            </div>
            <div className="feature-item">
              <img src="./inventory.svg" alt="Inventory Management" />
              <p>
                <span className="bold">Inventory Management. </span>
                Never miss a sale due to stockouts. Keep your inventory in check
                with our efficient tracking tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="container">
          <h2>Simple pricing, right for you</h2>
          <p>
            Whether you are just getting started or ready to manage more, we
            have got a plan that fits your needs.
          </p>
          <div className="pricing-options">
            <div className="pricing-card free">
              <h3>Free Plan</h3>
              <p className="price">
                $0<span className="price-detail"> / month</span>
              </p>
              <p className="plan-description">
                Manage upto 3 properties absolutely free.
              </p>
              <ul className="features-list">
                <li>
                  <img src="./check.svg" alt="" />
                  Basic reporting
                </li>
                <li>
                  <img src="./check.svg" alt="" />
                  Email support
                </li>
                <li>
                  <img src="./check.svg" alt="" />
                  Community access
                </li>
              </ul>
              <button className="btn">Get started</button>
            </div>
            <div className="pricing-card premium">
              <h3>Premium Plan</h3>
              <p className="price">
                $19.99<span className="price-detail"> / month</span>
              </p>
              <p className="plan-description">
                Manage an unlimited amount of properties with more with advanced
                features.
              </p>
              <ul className="features-list">
                <li>
                  <img src="./check2.svg" alt="" />
                  Advanced reporting
                </li>
                <li>
                  <img src="./check2.svg" alt="" />
                  Premium email support
                </li>
                <li>
                  <img src="./check2.svg" alt="" />
                  Manage multiple properties
                </li>
                <li>
                  <img src="./check2.svg" alt="" />
                  Priority community access
                </li>
              </ul>
              <button className="btn btn-primary">Buy this plan</button>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div className="testimonial-container">
          <div className="testimonial">
            <img
              src="./brand-logo-1.png"
              alt="Brand Logo 1"
              className="brand-logo"
            />

            <blockquote>
              “FuelDash has transformed the way we manage our gas station. The
              real-time tracking and inventory insights have been game-changers
              for our daily operations.”
            </blockquote>
            <div className="testimonial-author">
              <img
                src="https://randomuser.me/api/portraits/men/19.jpg"
                alt="John Doe"
                className="author-image"
              />
              <div className="author-info">
                <span className="author-name">John Doe</span>
                <span className="author-title">Owner, Sun Valley Gas</span>
              </div>
            </div>
          </div>
          <div className="vertical-line"></div>
          <div className="testimonial">
            <img
              src="./brand-logo-2.png"
              alt="Brand Logo 2"
              className="brand-logo"
            />
            <blockquote>
              “Thanks to FuelDash, we have seen a significant improvement in our
              sales and customer satisfaction. Their analytics tools are
              top-notch.”
            </blockquote>
            <div className="testimonial-author">
              <img
                src="https://randomuser.me/api/portraits/men/61.jpg"
                alt="John Smith"
                className="author-image"
              />
              <div className="author-info">
                <span className="author-name">Carlos Rodriguez</span>
                <span className="author-title">Owner, Hudson Peaks Gas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="fueldash-stats">
        <div className="container">
          <div className="stats-heading">
            <span>Our track record</span>
            <h2>Powering Performance at the Pump</h2>
            <p>
              Discover how FuelDash is driving success for independent gas
              station owners across the country.
            </p>
          </div>
          <div className="stats-container">
            <div className="stat">
              <h3>1,000+</h3>
              <p>Stations Managed</p>
            </div>
            <div className="stat">
              <h3>500k+</h3>
              <p>Transactions Processed Daily</p>
            </div>
            <div className="stat">
              <h3>99.8%</h3>
              <p>Operational Uptime</p>
            </div>
            <div className="stat">
              <h3>50m+</h3>
              <p>Gallons of Fuel Monitored Monthly</p>
            </div>
          </div>
        </div>
      </section>
      <section id="final-cta">
        <div className="container">
          <h2>Optimize Your Operations Now</h2>
          <p>
            Join the countless gas station owners who are enhancing their
            businesses with FuelDash. Experience the ease of managing sales,
            inventory, and data analytics all in one place.
          </p>
          <div className="cta-buttons">
            <Link href="/signup" className="btn btn-primary">
              Get Started
            </Link>
            <Link href="/about" className="btn btn-secondary">
              Learn more →
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
