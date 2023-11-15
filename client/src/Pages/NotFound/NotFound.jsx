import { Link } from "react-router-dom";
import "./NotFound.scss";

function NotFound() {
  return (
    <div className="not-found-container">
      <span>404</span>
      <h2>Page not found</h2>
      <p>Sorry, we couldn’t find the page you’re looking for.</p>
      <Link to="/" className="home-link">
        ← Back to home
      </Link>
    </div>
  );
}

export default NotFound;
