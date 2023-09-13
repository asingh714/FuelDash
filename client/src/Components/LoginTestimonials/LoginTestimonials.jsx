import { useState, useEffect } from "react";

import "./LoginTestimonials.scss";

const testimonials = [
  {
    review:
      "I was always behind on tracking my sales data, but FuelDash has completely changed the game for me. The real-time analytics are incredibly helpful. Now, I make informed decisions quickly and have seen my profits go up!",
    name: "John Doe",
    company: "Pine Valley Gas & Go",
    location: "Omaha, NE",
  },
  {
    review:
      "I can't believe how easy it is to use FuelDash. The dashboard gives me everything I need to know, from my best-selling items to payment types. It's like having an extra employee that works 24/7!",
    name: "Jane Smith",
    company: "Lakeside Fuels",
    location: "Chicago, IL",
  },
  {
    review:
      "Any time I've had a question or needed help, FuelDash's customer service has been top-notch. The platform itself is a lifesaver, but the support team makes it even better.",
    name: "Carlos Rodriguez",
    company: "Metro Fuel Stop",
    location: "Miami, FL",
  },
  {
    review:
      "Before FuelDash, I had to rely on gut feeling and rough calculations. Now, I get insights that even some of the big chains would envy. Couldn't be happier with this tool!",
    name: "Emily Brown",
    company: "Route 66 Gas & Snacks",
    location: "Flagstaff, AZ",
  },
];

const LoginTestimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 9000);

    return () => clearInterval(intervalId);
  }, []);

  const { review, name, company, location } = testimonials[currentIndex];

  return (
    <div className="login-testimonial-container">
      <p>{review}</p>
      <span>{name}</span>
      <span>{company},</span>
      <span>{location}</span>
      <div className="circle-container">
        {testimonials.map((_, index) => (
          <div
            key={index}
            className={`circle ${currentIndex === index ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default LoginTestimonials;
