import React from "react";
import { useParams, Link } from "react-router-dom";

// ✅ USE DOUBLE DOTS (../../) to go back 2 folders
import { blogData } from "../../Data/SiteData"; 
import PageHeader from "../../Components/Banner/PageHeader";
import BlogSection from "../../Components/Blog/blog"; 

const BlogPage = () => {
  const { id } = useParams();

  // --- 1. SINGLE POST VIEW (When you click Read More) ---
  if (id) {
    const post = blogData.find((item) => item.id.toString() === id);

    if (!post) return (
       <div className="text-center mt-5">
          <h3>Post Not Found</h3>
          <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
       </div>
    );

    return (
      <>
        {/* Header Banner */}
        <PageHeader title={post.title} breadcrumbActive={post.category} />
        
        <div className="section">
           <div className="container">
              <div className="row justify-content-center">
                 <div className="col-lg-10">
                    {/* Full Image */}
                    <img 
                       src={post.image} 
                       alt={post.title} 
                       className="w-100 rounded-4 mb-4" 
                       style={{height: "400px", objectFit: "cover"}} 
                    />
                    
                    {/* Metadata */}
                    <div className="d-flex gap-3 text-muted mb-3">
                       <span>{post.date}</span>
                       <span>{post.category}</span>
                    </div>

                    <h2 className="mb-4">{post.title}</h2>
                    
                    {/* Full Content */}
                    <div className="blog-content" style={{fontSize: "1.1rem", lineHeight: "1.8"}}>
                        {post.content || post.excerpt} 
                    </div>

                    <div className="mt-5">
                       <Link to="/blog" className="btn btn-outline-primary rounded-pill">Back to Blogs</Link>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </>
    );
  }

  // --- 2. LIST VIEW (Default View) ---
  return (
    <>
      <PageHeader title="Our Blog" breadcrumbActive="Blog" />
      <BlogSection />
    </>
  );
};

export default BlogPage;