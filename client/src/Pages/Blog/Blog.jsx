import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import BlogPosts from "../../Components/BlogPost/BlogPosts";

import "./Blog.scss";

const Blog = () => {
  return (
    <div>
      <NavBar />
      <main className="blog-main-content">
        <section className="blog-header">
          <h1>From the Blog</h1>
          <p>Learn how to grow your business with our expert advice.</p>
        </section>
        <BlogPosts />
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
