import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

// ✅ Added 'id' to the props list
const ServiceCard = ({ id, icon, title, content, speed = "", className = "" }) => {
    return(
        <>
            <AnimateOnScroll animation="fadeInLeft" speed={speed}>
                <div className={`card card-service ${className}`}>
                    <div className="d-flex flex-row justify-content-between gspace-2 gspace-md-3 align-items-center">
                        <div>
                            <div className="service-icon-wrapper">
                                <div className="service-icon">
                                    {typeof icon === 'string' && (icon.startsWith('/') || icon.includes('.')) ? (
                                        <img src={icon} alt={title + " icon"} className="img-fluid" />
                                    ) : (
                                        <i className={icon} aria-hidden="true" />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="service-title">
                            <h4>{title}</h4>
                        </div>
                    </div>
                    <p>{content}</p>
                    
                    {/* ✅ CHANGED: Uses Link to go to /service/ID */}
                    <Link to={`/service/${id}`} className="btn btn-accent">
                        <div className="btn-title">
                            <span>View Details</span>
                        </div>
                        <div className="icon-circle">
                            <i className="fa-solid fa-arrow-right"></i>
                        </div>
                    </Link>
                </div>
            </AnimateOnScroll>
        </>
    );
}

export default ServiceCard;