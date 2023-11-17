import PropTypes from "prop-types";
import "./TestimonialCard.scss";

const TestimonialCard = ({ testimonial }) => (
  <div className="testimonial-card">
    <blockquote>&ldquo;{testimonial.review}&rdquo;</blockquote>
    <div className="testimonial-author">
      <img src={testimonial.image} alt={testimonial.name} />
      <div>
        <h5>{testimonial.name}</h5>
        <p>{testimonial.company}</p>
      </div>
    </div>
  </div>
);

TestimonialCard.propTypes = {
  testimonial: PropTypes.shape({
    review: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    company: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default TestimonialCard;
