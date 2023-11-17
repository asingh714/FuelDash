import React, { useState } from "react";
import PropTypes from "prop-types";

import "./FAQ.scss";
import Footer from "../../Components/Footer/Footer";
import NavBar from "../../Components/NavBar/NavBar";

const faqsData = [
  {
    question: "How do I track my fuel sales?",
    answer:
      "FuelDash provides a comprehensive dashboard where you can monitor your sales in real-time, including quantities sold and profits made.",
  },
  {
    question: "Can I manage multiple gas stations with FuelDash?",
    answer:
      "Yes, FuelDash supports multi-station management, allowing you to oversee and compare the operations of different locations seamlessly.",
  },
  {
    question: "What kind of reports can I generate with FuelDash?",
    answer:
      "FuelDash offers various reports such as sales reports, inventory reports, and custom reports that can be tailored to your specific needs.",
  },
  {
    question: "Is there customer support for FuelDash?",
    answer:
      "Absolutely! Our dedicated customer support team is available 24/7 to assist you with any inquiries or issues you may encounter.",
  },
  {
    question: "How does FuelDash help with inventory management?",
    answer:
      "FuelDash has an advanced inventory management system that tracks your stock levels, sends alerts for low inventory, and predicts future needs based on sales trends.",
  },
];

const FAQItem = ({ faq, index, toggleFAQ }) => (
  <div
    className={`faq-item ${faq.open ? "open" : ""}`}
    onClick={() => toggleFAQ(index)}
  >
    <div className="faq-question">
      {faq.question}
      <span className="faq-toggle">{faq.open ? "-" : "+"}</span>
    </div>
    <div className="faq-answer">{faq.open && <p>{faq.answer}</p>}</div>
  </div>
);

FAQItem.propTypes = {
  faq: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    open: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
  toggleFAQ: PropTypes.func.isRequired,
};

const FAQs = () => {
  const [faqs, setFaqs] = useState(
    faqsData.map((faq) => ({ ...faq, open: false }))
  );

  const toggleFAQ = (index) => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <>
      <NavBar />
      <div className="faqs-container">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQs;
