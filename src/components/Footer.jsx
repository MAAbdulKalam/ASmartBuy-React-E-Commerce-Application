import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-3 fixed-bottom w-100">
            <div className="container text-center text-lg-start">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12 text-md-center text-lg-start mb-2 mb-lg-0">
                        <p className="mb-0">&copy; 2025 | All Rights Reserved. Built by | M A ABDUL KALAM</p>
                    </div>
                    <div className="col-lg-6 col-md-12 d-flex justify-content-center justify-content-lg-end gap-3">
                        <a href="https://mail.google.com/mail/u/0/#inbox?compose=new" className="text-white">
                            <FaEnvelope size={18} />
                        </a>
                        <a href="https://www.linkedin.com/in/m-a-abdul-kalam/" target="_blank" rel="noopener noreferrer" className="text-white">
                            <FaLinkedin size={18} />
                        </a>
                        <a href="https://github.com/MAAbdulKalam" target="_blank" rel="noopener noreferrer" className="text-white">
                            <FaGithub size={18} />
                        </a>
                        <a href="https://www.instagram.com/ak_mannuuuuu7/" target="_blank" rel="noopener noreferrer" className="text-white">
                            <FaInstagram size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
