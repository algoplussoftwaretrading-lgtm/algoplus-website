import React from "react";
import { NavLink, Link } from "react-router-dom";
/* cspell:ignore themeswitch */
import ThemeSwitcher from "../Theme/themeswitch";
import { serviceData } from "../../Data/SiteData";

function Navbar() {

  return (
    <div className="navbar-wrapper">
      <nav className="navbar navbar-expand-lg">
        <div className="navbar-container">
          
          {/* --- 1. LOGO --- */}
          <div className="logo-container">
            <NavLink className="navbar-brand" to="/">
              <img src="/assets/images/marko-logo.webp" className="site-logo img-fluid" alt="Algo Plus - Digital Marketing Agency Logo" />
            </NavLink>
          </div>

          {/* --- 2. MOBILE TOGGLE BUTTON (The Hamburger) --- */}
          <button 
            className="navbar-toggler nav-btn" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <i className="fa-solid fa-bars"></i>
          </button>

          {/* --- 3. MENU LINKS (Controls BOTH Desktop & Mobile) --- */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              
              <li className="nav-item">
                <NavLink to="/" className="nav-link" end>Home</NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/about" className="nav-link">About</NavLink>
              </li>

              {/* --- SERVICES DROPDOWN --- */}
              <li className="nav-item dropdown">
                 <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    Services <i className="fa-solid fa-angle-down accent-color"></i>
                 </a>
                 <ul className="dropdown-menu">
                    <li><NavLink to="/service" className="dropdown-item">View All Services</NavLink></li>
                    {serviceData.map((service) => (
                      <li key={service.id}>
                        <NavLink to={`/service/${service.slug}`} className="dropdown-item">{service.title}</NavLink>
                      </li>
                    ))}
                 </ul>
              </li>

              {/* ✅ BLOG IS REMOVED FROM HERE (Unified for Mobile & Desktop) */}

              {/* --- COMPANY DROPDOWN (Contains Blog) --- */}
              <li className="nav-item dropdown">
                 <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                    Company <i className="fa-solid fa-angle-down accent-color"></i>
                 </a>
                 <ul className="dropdown-menu">
                    <li><NavLink to="/team" className="dropdown-item">Our Team</NavLink></li>
                    <li><NavLink to="/case_studies" className="dropdown-item">Case Studies</NavLink></li>
                    
                    {/* ✅ BLOG IS NOW HERE (Visible in Mobile Dropdown too) */}
                    <li><NavLink to="/blog" className="dropdown-item">Blog / News</NavLink></li>

                    <li><NavLink to="/partnership" className="dropdown-item">Partnership</NavLink></li>
                    <li><NavLink to="/pricing" className="dropdown-item">Pricing</NavLink></li>
                    <li><NavLink to="/testimonial" className="dropdown-item">Testimonials</NavLink></li>
                    <li><NavLink to="/faq" className="dropdown-item">FAQs</NavLink></li>
                 </ul>
              </li>

              <li className="nav-item">
                <NavLink to="/contact" className="nav-link">Contact</NavLink>
              </li>

            </ul>
          </div>

          {/* --- 4. RIGHT SIDE ACTIONS (Theme & Phone) --- */}
          <div className="navbar-action-container">
            <div className="navbar-action-button"><ThemeSwitcher /></div>
            <div className="navbar-icon-wrapper">
              <div className="icon-circle"><i className="fa-solid fa-phone-volume"></i></div>
              <h6>+971 50 485 2446</h6>
            </div>
          </div>

        </div>
      </nav>
    </div>
  );
}

export default Navbar;
