import React from "react";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";
import { pricingData } from "../../Data/SiteData"; 

function PricingPlanSection() {
  // Safety: Ensure plans is an array
  const plans = Array.isArray(pricingData) ? pricingData : [];

  return (
    <div className="section">
      <div className="hero-container">
        <div className="d-flex flex-column justify-content-center text-center gspace-5">
          
          <AnimateOnScroll animation="fadeInUp" speed="normal">
            <div className="d-flex flex-column gspace-2">
              <div className="sub-heading align-self-center">
                <i className="fa-regular fa-circle-dot"></i>
                <span>Pricing Plans</span>
              </div>
              <h2 className="title-heading heading-container heading-container-short">
                Flexible Pricing for Every Business
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="row row-cols-lg-3 row-cols-1 grid-spacer-2 align-items-center">
            
            {/* 1. Title Box (Always First) */}
            <div className="col">
              <div className="pricing-container">
                <AnimateOnScroll animation="fadeInLeft" speed="normal">
                  <div className="card card-pricing-title">
                    <div className="spacer" />
                    <div className="content">
                      <h3 className="title-heading">Let's Find the Right Strategy for You!</h3>
                      <div className="link-wrapper">
                        <a href="./contact">Book a Free Consultation</a>
                        <i className="fa-solid fa-arrow-circle-right"></i>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>

            {/* 2. Dynamic Plans Loop (Shows ALL plans in SiteData) */}
            {plans.map((item, index) => {
               // Logic: If it's the 2nd item (index 1), make it the Big Purple "Enterprise" card
               const isHighlight = index === 1; 
               
               return (
                <div className="col" key={item.id || index}>
                   <AnimateOnScroll animation="fadeInUp" speed={isHighlight ? "slow" : "normal"}>
                      <div className={`card card-pricing ${isHighlight ? "pricing-highlight" : ""}`}>
                          
                          {/* Highlight card needs a top spacer */}
                          {isHighlight && <div className="spacer" />}

                          <h4>{item.plan}</h4>
                          <p className={isHighlight ? "" : "text-muted"}>{item.description}</p>
                          
                          <div className="d-flex flex-row gspace-1 align-items-center h-100">
                             <h3>{item.price}</h3> 
                             <span className={isHighlight ? "text-white-50" : "text-muted"}>/Month</span>
                          </div>
                          
                          <a href="./contact" className="btn btn-accent">
                              <div className="btn-title"><span>View Details</span></div>
                              <div className="icon-circle"><i className="fa-solid fa-arrow-right"></i></div>
                          </a>

                          <ul className={`check-list ${isHighlight ? "mt-4" : ""}`}>
                              {/* Safety check: ensure features is an array before mapping */}
                              {(Array.isArray(item.features) ? item.features : []).map((feature, i) => (
                                  <li key={i}>
                                    <i className={`${isHighlight ? "fa-solid fa-check" : "fa-regular fa-circle-check accent-color"} me-2`}></i>
                                    {feature}
                                  </li>
                              ))}
                          </ul>
                      </div>
                   </AnimateOnScroll>
                </div>
               );
            })}

            {/* 3. Highlight Box (Always Last) */}
            <div className="col">
              <div className="pricing-container">
                <AnimateOnScroll animation="fadeInRight" speed="normal">
                  <div className="card pricing-highlight-box">
                    <div className="d-flex flex-column gspace-2 w-100">
                      <h5>Your Growth, Our Priority!</h5>
                      <div className="d-flex flex-column gspace-2">
                        <div className="pricing-highlights">
                          <span>Data-Driven Digital Marketing</span>
                          <i className="fa-solid fa-arrow-circle-right"></i>
                        </div>
                        <div className="pricing-highlights">
                          <span>Scalable Solution for Every Business</span>
                          <i className="fa-solid fa-arrow-circle-right"></i>
                        </div>
                      </div>
                    </div>
                    <div className="spacer" />
                  </div>
                </AnimateOnScroll>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPlanSection;