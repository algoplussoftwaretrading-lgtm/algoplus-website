import React from "react";
import { Link } from "react-router-dom"; // ✅ Added Import
import { serviceData } from "../../Data/SiteData"; // ✅ Added Import
import AnimateOnScroll from "../Hooks/AnimateOnScroll";
import CounterOnScroll from "../Hooks/CounterOnScroll";

function ExpertiseSection(){

    return(
        <>
            <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column flex-lg-row gspace-5">
                        
                        {/* LEFT SIDE: IMAGE (Untouched) */}
                        <div className="expertise-img-layout">
                            <div className="image-container expertise-img">
                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <img
                                        src="/assets/images/digital-transformation.webp"
                                        alt="Digital transformation services and AI solutions by ALGO Plus IT company Dubai UAE"
                                        className="img-fluid"
                                    />
                                </AnimateOnScroll>
                                <div className="expertise-layout">
                                    <div className="d-flex flex-column">
                                        <div className="card-expertise-wrapper">
                                            <AnimateOnScroll animation="fadeInDown" speed="normal">
                                                <div className="card card-expertise">
                                                    <h4>Ready to Elevate Your Digital Presence?</h4>
                                                    <p>Let's create a custom strategy that fits your business goals.</p>
                                                    <div className="d-flex align-items-center flex-row gspace-2 expertise-link">
                                                        <a href="./contact">Get Free Consultation</a>
                                                        <i className="fa-solid fa-circle-arrow-right"></i>
                                                    </div>
                                                </div>
                                            </AnimateOnScroll>
                                        </div>
                                        <div className="expertise-spacer"></div>
                                    </div>
                                    <div className="expertise-spacer"></div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: CONTENT */}
                        <div className="expertise-title">
                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <div className="sub-heading">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>Our Expertise</span>
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <h2 className="title-heading">
                                    Data Driven Strategies, Measurable Results
                                </h2>
                            </AnimateOnScroll>
                            <p>
                                At Algo Plus, we specialize in crafting innovative digital marketing strategies that drive real business growth. Our expertise
                                ensures your brand stays ahead in the competitive digital landscape.
                            </p>
                            
                            <div className="d-flex flex-column flex-md-row gspace-2">
                                <div className="expertise-list">
                                    <h5>What We Do Best</h5>
                                    
                                    {/* ✅ THE ONLY CHANGE IS HERE: Dynamic List */}
                                    <ul className="check-list">
                                        {serviceData.map((service) => (
                                            <li key={service.id}>
                                                <Link 
                                                    to={`/service/${service.slug}`} 
                                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                                >
                                                    {service.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    {/* ✅ END OF CHANGE */}

                                </div>

                                <AnimateOnScroll animation="fadeInUp">
                                    <div className="card card-expertise card-expertise-counter animate-box">
                                        <div className="d-flex flex-row gspace-2 align-items-center">
                                            <div className="d-flex flex-row align-items-center">
                                            <CounterOnScroll
                                                target={6}
                                                suffix="+"
                                                counterClassName="counter"
                                                suffixClassName="counter-detail"
                                            />
                                            </div>
                                            <h6>Years Seasoned Professional IT Solutions</h6>
                                        </div>
                                        <p>
                                            Proven. Powerful. Results-obsessed.<br/>Your growth story starts here.
                                        </p>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ExpertiseSection;