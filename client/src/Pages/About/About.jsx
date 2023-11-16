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
      <Footer />
    </div>
  );
};

export default About;
