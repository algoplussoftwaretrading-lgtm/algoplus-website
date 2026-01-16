import React from "react";
import VideoButton from "../Video/VideoButton";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function GuideBannerSection(){
    return(
        <>
            <div className="section-guide">
                <div className="guide-banner">
                    <div className="hero-container">
                        <AnimateOnScroll animation="fadeInUp" speed="normal">
                            <div className="guide-content">
                                <div className="guide-video-container">
                                    <VideoButton videoUrl="https://www.youtube.com/embed/VhBl3dHT5SY?autoplay=1" />
                                    <p>See How We Help Brands Grow</p>
                                </div>
                                <div className="d-flex flex-column gspace-2">
                                    <h3 className="title-heading">Transform Business with Algo Plus!</h3>
                                    <p>Elevate your IT solutions and AI capabilities to the next level with data-driven strategies and innovative AI voice agents, digital transformation, custom ERP/CRM, cyber security, and SEO services. Let's build something extraordinary together in Dubai and the UAE!</p>
                                </div>
                            </div>
                        </AnimateOnScroll>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GuideBannerSection;