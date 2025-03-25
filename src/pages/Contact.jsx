import React from "react";
import FounderLogo from "../assets/founderAK.jpeg";
import Footer from "../components/Footer";


const Contact = () => {
    return (
        <div className="contact-container py-5 mt-5">
            <div className="container">
                <h1 className="text-center mb-4">Get in Touch with ASmartBuy</h1>
                <p className="text-center">Have questions? We're here to help! Contact us for any queries related to orders, products, or assistance.</p>

                <div className="row align-items-center mt-5">
                    {/* Left Side: Image */}
                    <div className="col-md-6">
                        <img src={FounderLogo} alt="Customer Support" className="img-fluid rounded shadow" />
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="col-md-6">
                        <div className="card shadow p-4">
                            <h4 className="mb-3 text-center">Reach Out to Us</h4>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Your Name</label>
                                    <input type="text" className="form-control" placeholder="Enter your name" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input type="email" className="form-control" placeholder="Enter your email" required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Message</label>
                                    <textarea className="form-control" rows="4" placeholder="How can we help?" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Contact Information Section */}
                <div className="row text-center mt-5">
                    <div className="col-md-4">
                        <h5><i className="bi bi-telephone"></i>Call Us</h5>
                        <p className="contactInfo">+91 9014821394</p>
                    </div>
                    <div className="col-md-4">
                        <h5><i className="bi bi-envelope"></i>Email Us</h5>
                        <p className="contactInfo">akmeansabdul@gmail.com</p>
                    </div>
                    <div className="col-md-4">
                        <h5><i className="bi bi-geo-alt"></i>Visit Us</h5>
                        <p className="contactInfo">Marathahalli, Bengaluru, Karnataka 560037</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Contact;
