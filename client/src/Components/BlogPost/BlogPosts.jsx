import { Link } from "react-router-dom";

import "./BlogPosts.scss";

const BlogPosts = () => {
  return (
    <section id="blog-articles">
      <Link>
        <article className="blog-post">
          <img src="efficient.png" alt="Efficient Fuel Management" />
          <div className="blog-post-info">
            <h2>
              Fuel Efficiency and Management: Techniques to Maximize Profit
            </h2>
            <time dateTime="2023-03-16">March 16, 2023</time>
            <span className="blog-category">Operations</span>
            <p>
              Explore strategies to improve fuel efficiency and management to
              maximize profits at your gas station.
            </p>
            <div className="blog-author">
              <img src="ceo.png" alt="Aman Singh" />
              <div>
                <span>Aman Singh</span>
                <span>CEO</span>
              </div>
            </div>
          </div>
        </article>
      </Link>

      <Link>
        <article className="blog-post">
          <img src="charging.png" alt="Electric Vehicle Charging Station" />
          <div className="blog-post-info">
            <h2>
              Navigating the Shift to Electric: What Gas Stations Need to Know
            </h2>
            <time dateTime="2023-05-10">May 10, 2023</time>
            <span className="blog-category">Innovation</span>
            <p>
              With the rise of electric vehicles, learn how your gas station can
              adapt with EV charging solutions and more.
            </p>
            <div className="blog-author">
              <img src="ceo.png" alt="Aman Singh" />
              <div>
                <span>Aman Singh</span>
                <span>CEO</span>
              </div>
            </div>
          </div>
        </article>
      </Link>

      <Link>
        <article className="blog-post">
          <img src="new-tech.png" alt="Digital Gas Station Services" />
          <div className="blog-post-info">
            <h2>
              Leveraging Technology for Superior Customer Service in Gas
              Stations
            </h2>
            <time dateTime="2023-02-12">February 12, 2023</time>
            <span className="blog-category">Technology</span>
            <p>
              Discover how the latest technology can enhance the customer
              service experience at your gas station.
            </p>
            <div className="blog-author">
              <img src="ceo.png" alt="Aman Singh" />
              <div>
                <span>Aman Singh</span>
                <span>CEO</span>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </section>
  );
};

export default BlogPosts;
