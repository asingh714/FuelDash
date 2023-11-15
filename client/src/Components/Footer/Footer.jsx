import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="fueldash-footer">
      <div className="newsletter-section">
        <h2>Stay Updated with FuelDash</h2>
        <p>
          Join our newsletter and get the latest on gas station management tips,
          updates, and industry news every month.
        </p>
        <form action="/subscribe" method="post">
          <input type="email" placeholder="Enter email address..." required />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="footer-nav">
        <div className="footer-column">
          <h4>About</h4>
          <ul>
            <li>
              <a href="/about">Our Story</a>
            </li>
            <li>
              <a href="/team">Team</a>
            </li>
            <li>
              <a href="/careers">Careers</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Explore</h4>
          <ul>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <a href="/customers">Customers</a>
            </li>
            <li>
              <a href="/faqs">FAQs</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="/contact">Get in Touch</a>
            </li>
            <li>
              <a href="/support">Support</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
