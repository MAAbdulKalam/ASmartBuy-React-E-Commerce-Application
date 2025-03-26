import React from "react";
import aboutLogo from "../assets/ASmartBuy.png";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="about-container py-5 mt-5">
      <div className="about-banner">
        <div className="about-content-left">
          <h1>Welcome to ASmartBuy!</h1>
          <p>Your ultimate destination for groceries, makeup sets, furniture, food products, and more.</p>
        </div>
        <div className="about-content-right">
          <img src={aboutLogo} alt="Shopping" className="about-img" />
        </div>
      </div>

      <div className="about-content py-5 mt-5">
        <h2>Who We Are</h2>
        <p>
        At ASmartBuy, we believe in providing the best shopping experience with a wide range of products. Whether you need fresh groceries,
        the latest makeup collections, stylish furniture like beds and sofas, or high-quality food products, we’ve got you covered. Our mission is 
        to offer high-quality products at unbeatable prices, ensuring customer satisfaction at every step.
        </p>
      </div>

      <div className="why-choose">
        <h2>Why Choose ASmartBuy?</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Quality Assurance</h3>
            <p>All our products go through rigorous quality checks to ensure you get only the best.</p>
          </div>
          <div className="feature-card">
            <h3>Wide Product Range</h3>
            <p>From groceries to home essentials, we offer a vast collection of products.</p>
          </div>
          <div className="feature-card">
            <h3>Fast & Reliable Delivery</h3>
            <p>Get your orders delivered quickly with our efficient logistics network.</p>
          </div>
          <div className="feature-card">
            <h3>24/7 Customer Support</h3>
            <p>We are always here to assist you with any queries or concerns.</p>
          </div>
        </div>
      </div>

      <div className="commitments py-5 mt-5 mb-3">
        <h2>Our Commitment</h2>
        <p>
        ​At ASmartBuy, customer satisfaction is our top priority. We are committed to offering top-notch products, seamless shopping experiences 
        and unbeatable prices. With secure payments, easy returns, and round-the-clock support, shopping has never been more convenient!
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default About;
