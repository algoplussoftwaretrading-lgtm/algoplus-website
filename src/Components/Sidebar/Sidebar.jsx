import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { serviceData } from "../../Data/SiteData";
import logo from "/assets/images/marko-logo.webp";

function Sidebar() {
    // --- STATE TO HANDLE DROPDOWN ---
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    const overlayRef = useRef(null);
    const sidebarRef = useRef(null);

    // --- 1. SIDEBAR OPEN/CLOSE LOGIC (Kept same as before) ---
    function closeSidebar() {
        const sidebar = sidebarRef.current;
        const overlay = overlayRef.current;
        if(sidebar && overlay) {
            sidebar.classList.remove("active");
            setTimeout(() => {
                overlay.classList.remove("active");
            }, 200);
        }
    }

    useEffect(() => {
        // We look for the button in the Header to trigger opening
        const menuBtn = document.querySelector(".nav-btn");
        const closeBtn = sidebarRef.current?.querySelector(".close-btn");
        const overlay = overlayRef.current;
        const sidebar = sidebarRef.current;

        function openSidebar() {
            if(overlay && sidebar) {
                overlay.classList.add("active");
                setTimeout(() => {
                    sidebar.classList.add("active");
                }, 10);
            }
        }

        menuBtn?.addEventListener("click", openSidebar);
        closeBtn?.addEventListener("click", closeSidebar);
        overlay?.addEventListener("click", closeSidebar);

        return () => {
            menuBtn?.removeEventListener("click", openSidebar);
            closeBtn?.removeEventListener("click", closeSidebar);
            overlay?.removeEventListener("click", closeSidebar);
        };
    }, []);

    // --- 2. DROPDOWN TOGGLE FUNCTION (The Fix) ---
    const toggleCompanyMenu = (e) => {
        e.preventDefault(); // Prevent URL jump
        setIsCompanyOpen(!isCompanyOpen); // Toggle True/False
    };

    const toggleServicesMenu = (e) => {
        e.preventDefault(); // Prevent URL jump
        setIsServicesOpen(!isServicesOpen); // Toggle True/False
    };

    return (
        <div>
            <div ref={overlayRef} className="sidebar-overlay"></div>
            <div ref={sidebarRef} className="sidebar">
                
                {/* LOGO */}
                <div className="sidebar-header">
                    <div className="logo">
                        <img src={logo} className="site-logo img-fluid logo" alt="Logo" />
                    </div>
                    <button className="close-btn" onClick={closeSidebar}><span>X</span></button>
                </div>

                {/* MENU */}
                <ul className="menu">
                    <li><NavLink to="/" onClick={closeSidebar}>Home</NavLink></li>
                    <li><NavLink to="/about" onClick={closeSidebar}>About Us</NavLink></li>

                    {/* ✅ SERVICES DROPDOWN */}
                    <li className="sidebar-dropdown">
                        <div className="dropdown-header" onClick={toggleServicesMenu} style={{cursor: "pointer"}}>
                            <span>Services</span>
                            <button className="sidebar-dropdown-btn">
                                {/* Rotate arrow if open */}
                                <i className={`fa-solid fa-angle-down ${isServicesOpen ? "fa-rotate-180" : ""}`} style={{transition: "0.3s"}}></i>
                            </button>
                        </div>

                        {/* ✅ CONDITIONAL CLASS: If State is True, add 'active' */}
                        <ul className={`sidebar-dropdown-menu ${isServicesOpen ? "active" : ""}`}>
                            <li><NavLink to="/service" onClick={closeSidebar}>View All Services</NavLink></li>
                            {serviceData.map((service) => (
                                <li key={service.id}>
                                    <NavLink to={`/service/${service.slug}`} onClick={closeSidebar}>{service.title}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </li>

                    {/* ✅ FIXED DROPDOWN */}
                    <li className="sidebar-dropdown">
                        <div className="dropdown-header" onClick={toggleCompanyMenu} style={{cursor: "pointer"}}>
                            <span>Company</span>
                            <button className="sidebar-dropdown-btn">
                                {/* Rotate arrow if open */}
                                <i className={`fa-solid fa-angle-down ${isCompanyOpen ? "fa-rotate-180" : ""}`} style={{transition: "0.3s"}}></i>
                            </button>
                        </div>

                        {/* ✅ CONDITIONAL CLASS: If State is True, add 'active' */}
                        <ul className={`sidebar-dropdown-menu ${isCompanyOpen ? "active" : ""}`}>
                            <li><NavLink to="/team" onClick={closeSidebar}>Our Team</NavLink></li>
                            <li><NavLink to="/case_studies" onClick={closeSidebar}>Case Studies</NavLink></li>
                            <li><NavLink to="/blog" onClick={closeSidebar}>Blog / News</NavLink></li>
                            <li><NavLink to="/partnership" onClick={closeSidebar}>Partnership</NavLink></li>
                            <li><NavLink to="/pricing" onClick={closeSidebar}>Pricing Plan</NavLink></li>
                            <li><NavLink to="/testimonial" onClick={closeSidebar}>Testimonial</NavLink></li>
                            <li><NavLink to="/faq" onClick={closeSidebar}>FAQs</NavLink></li>
                        </ul>
                    </li>

                    <li className="below-dropdown">
                        <NavLink to="/contact" onClick={closeSidebar}>Contact Us</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
