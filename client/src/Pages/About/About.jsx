import NavBar from "../../Components/NavBar/NavBar";
import Footer from "../../Components/Footer/Footer";

import "./About.scss";

const About = () => {
  return (
    <div>
      <NavBar />
      <section id="about-section">
        <div className="about-content">
          <h1>We&apos;re Fueling Progress</h1>
          <p>
            At FuelDash, we&apos;re dedicated to revolutionizing the fuel
            industry by empowering small gas station owners with data-driven
            insights. Our cutting-edge platform simplifies management, boosts
            efficiency, and drives profitability in an increasingly competitive
            market.
          </p>
        </div>
        <div className="about-images">
          <img src="happy-customer.png" alt="Satisfied Customer" />
          <img src="team-meeting.png" alt="Team Meeting" />
          <img src="working.png" alt="Employee Working" />
        </div>
      </section>

      <section id="mission-section">
        <div className="mission-content">
          <h2>Our Mission</h2>
          <p>
            To provide accessible, user-friendly, and powerful tools that enable
            small and independent gas station operators to make informed
            business decisions, enhance their operational workflows, and embrace
            the power of analytics and real-time data.
          </p>
        </div>
        <div className="mission-stats">
          <p>
            <strong>5,000+</strong> Stations Empowered
          </p>
          <p>
            <strong>10 Million+</strong> Transactions Processed
          </p>
          <p>
            <strong>99.8%</strong> Customer Satisfaction
          </p>
        </div>
      </section>

      <section id="values-section">
        <img src="our-values.png" alt="Our Core Values" />
        <h2>Our Core Values</h2>
        <p>
          Our commitment to excellence is driven by the values we uphold. We
          strive for innovation, customer success, integrity, and sustainability
          in everything we do.
        </p>
        <div className="values-grid">
          <div>
            <h3>Innovation</h3>
            <p>
              We believe in continuous improvement and always seek to advance
              our platform with the latest technology.
            </p>
          </div>
          <div>
            <h3>Customer Success</h3>
            <p>
              Your success is our success. We&apos;re committed to providing
              outstanding support and services to our clients.
            </p>
          </div>
          <div>
            <h3>Integrity</h3>
            <p>
              Honesty and transparency are at the heart of our business. We act
              ethically and responsibly in all our interactions.
            </p>
          </div>
          <div>
            <h3>Sustainability</h3>
            <p>
              We aim to contribute positively to the environment and society
              through eco-friendly business practices and community engagement.
            </p>
          </div>
        </div>
      </section>

      <section id="blog-section">
        <h2>Insights and Updates</h2>
        <div className="blog-posts">
          <article>
            <img src="blog-post-1.jpg" alt="Blog Post Title" />
            <h3>Maximizing Profits with Smart Inventory Management</h3>
            <p>
              Discover how integrating smart inventory systems can boost your
              gas station&apos;s profitability.
            </p>
          </article>
          <article>
            <img src="blog-post-2.jpg" alt="Blog Post Title" />
            <h3>Adapting to the Evolving Fuel Retail Landscape</h3>
            <p>
              Learn about the latest trends in the fuel retail industry and how
              to stay ahead of the curve.
            </p>
          </article>
          <article>
            <img src="blog-post-3.jpg" alt="Blog Post Title" />
            <h3>The Future of Fuel Stations: Electric and Beyond</h3>
            <p>
              Explore the future of fuel stations in a world moving towards
              electric vehicles.
            </p>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
