import React from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function BlogCard({ blog }) {
    return (
        <div className="col">
            <AnimateOnScroll animation="fadeInUp" speed="normal">
                <div className="card card-blog">
                    
                    {/* --- 1. IMAGE SECTION (Fixed Height + Link) --- */}
                    <div className="blog-image" style={{ width: "100%", height: "250px", overflow: "hidden" }}>
                        <Link to={`/blog/${blog.id}`}>
                            <img
                                src={blog.image}
                                alt={`${blog.title} - ${blog.category} article`}
                                loading="lazy"
                                decoding="async"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Link>
                    </div>

                    {/* --- 2. CARD BODY --- */}
                    <div className="card-body">
                        
                        {/* ✅ RESTORED: Date & Category Metadata */}
                        <div className="d-flex flex-row gap-3 mb-2" style={{fontSize: "0.85rem", color: "#888"}}>
                            <div className="d-flex align-items-center gap-1">
                                <i className="fa-solid fa-calendar text-primary"></i>
                                <span>{blog.date}</span>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                                <i className="fa-solid fa-folder text-primary"></i>
                                <span>{blog.category}</span>
                            </div>
                        </div>

                        {/* Title Link */}
                        <Link to={`/blog/${blog.id}`} className="blog-link">
                            {blog.title}
                        </Link>

                        {/* Excerpt */}
                        <p>
                            {blog.excerpt && blog.excerpt.length > 100 
                                ? blog.excerpt.substring(0, 100) + "..." 
                                : blog.excerpt}
                        </p>

                        {/* Read More Link */}
                        <Link to={`/blog/${blog.id}`} className="read-more">
                            Read More
                        </Link>
                    </div>
                </div>
            </AnimateOnScroll>
        </div>
    );
}

export default BlogCard;
