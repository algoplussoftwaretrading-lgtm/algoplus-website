import React from "react";
import { Link } from "react-router-dom";
// ✅ Import Data to make footer dynamic
import { serviceData } from "../../Data/SiteData";

function Footer() {
  return (
    <div className="section-footer">
      <div className="bg-footer-wrapper">
        <div className="bg-footer">
          <div className="row g-5">
            
            {/* Column 1: Logo & Info */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-logo-container">
                <Link className="navbar-brand" to="/">
                  <img src="/assets/images/marko-logo.webp" className="site-logo img-fluid" alt="Logo" />
                </Link>
                <p>
                  Empowering businesses with cutting-edge IT solutions, AI automation, and digital growth strategies tailored for the UAE market.
                </p>
                <div className="social-footer">
                  <a href="#" className="social-item"><i className="fa-brands fa-facebook-f"></i></a>
                  <a href="#" className="social-item"><i className="fa-brands fa-instagram"></i></a>
                  <a href="#" className="social-item"><i className="fa-brands fa-linkedin-in"></i></a>
                  <a href="#" className="social-item"><i className="fa-brands fa-twitter"></i></a>
                </div>
              </div>
            </div>

            {/* Column 2: Dynamic Services */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-services-container">
                <h5 className="text-white">Services</h5>
                <ul className="footer-list">
                  {/* ✅ Dynamic Map: Shows first 6 services automatically */}
                  {serviceData.slice(0, 6).map((item) => (
                    <li key={item.id}>
                      <Link to={`/service/${item.slug}`}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Column 3: Quick Links */}
            <div className="col-lg-2 col-md-6">
              <div className="footer-quick-links">
                <h5 className="text-white">Company</h5>
                <ul className="footer-list">
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/team">Our Team</Link></li>
                  <li><Link to="/case_studies">Case Studies</Link></li>
                  <li><Link to="/blog">Blog / News</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
            </div>

            {/* Column 4: Contact */}
            <div className="col-lg-4 col-md-6">
              <div className="footer-contact-container">
                <h5 className="text-white">Contact Us</h5>
                <ul className="contact-list">
                  <li>
                    <i className="fa-solid fa-location-dot accent-color me-2"></i>
                    140 Sheikh Zayed Rd - Al Wasl - Dubai
                  </li>
                  <li>
                    <i className="fa-solid fa-phone accent-color me-2"></i>
                    +971 50 485 2446
                  </li>
                  <li>
                    <i className="fa-solid fa-envelope accent-color me-2"></i>
                    info@algoplus.ae
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-spacer"></div>
          
          <div className="copyright-container">
            <div className="copyright">
              &copy; {new Date().getFullYear()} Algo Plus. All Rights Reserved.
            </div>
            <div className="d-flex gap-3">
              <Link to="/privacy" className="legal-link">Privacy Policy</Link>
              <Link to="/terms" className="legal-link">Terms & Conditions</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Footer;
