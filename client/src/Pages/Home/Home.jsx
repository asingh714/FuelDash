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
            <div>Get Started</div>
            <div>Learn more</div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
