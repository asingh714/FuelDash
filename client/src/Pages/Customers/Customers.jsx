import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";
import TestimonialCard from "../../Components/TestimonialCard/TestimonialCard";
import "./Customers.scss";

const testimonials = [
  {
    review:
      "I was always behind on tracking my sales data, but FuelDash has completely changed the game for me. The real-time analytics are incredibly helpful. Now, I make informed decisions quickly and have seen my profits go up!",
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    company: "Pine Valley Gas & Go",
    location: "Omaha, NE",
  },
  {
    review:
      "I can't believe how easy it is to use FuelDash. The dashboard gives me everything I need to know, from my best-selling items to payment types. It's like having an extra employee that works 24/7!",
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/23.jpg",
    company: "Lakeside Fuels",
    location: "Chicago, IL",
  },
  {
    review:
      "Any time I've had a question or needed help, FuelDash's customer service has been top-notch. The platform itself is a lifesaver, but the support team makes it even better.",
    name: "Carlos Rodriguez",
    image: "https://randomuser.me/api/portraits/men/61.jpg",
    company: "Metro Fuel Stop",
    location: "Miami, FL",
  },
  {
    review:
      "Before FuelDash, I had to rely on gut feeling and rough calculations. Now, I get insights that even some of the big chains would envy. Couldn't be happier with this tool!",
    name: "Emily Brown",
    image: "https://randomuser.me/api/portraits/women/79.jpg",
    company: "Route 66 Gas & Snacks",
    location: "Flagstaff, AZ",
  },
  {
    review:
      "Switching to FuelDash was the best decision for our rural service stations. The tailored reports and alerts system keeps us on top of our inventory and sales like never before.",
    name: "Ava Taylor",
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    company: "Country Roads Petroleum",
    location: "Asheville, NC",
  },
  {
    review:
      "FuelDash's intuitive interface and detailed analytics have made managing multiple gas station locations effortless. The competitor analysis feature is a game-changer for strategic planning.",
    name: "Liam Nguyen",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    company: "Citywide Fuels Network",
    location: "San Francisco, CA",
  },
  {
    review:
      "Our profitability has soared since we started using FuelDash. The insights into customer behavior and sales trends are invaluable for our marketing efforts.",
    name: "Sophia Patel",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    company: "Green Energy Stations",
    location: "Austin, TX",
  },
  {
    review:
      "As a new gas station owner, I was overwhelmed with the operational aspects, but FuelDash's guidance and analytics have simplified the complexities. I feel like I have a business advisor by my side.",
    name: "Ethan Wright",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    company: "Wright's City Pumps",
    location: "New York, NY",
  },
];

const Customers = () => (
  <>
    <NavBar />
    <section className="testimonials-section">
      <h2>We have worked with thousands of amazing people</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </section>
    <Footer />
  </>
);

export default Customers;
