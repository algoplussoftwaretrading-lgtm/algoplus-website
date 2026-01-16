import React from "react";
import { Link } from "react-router-dom";

const PageHeader = ({ title, breadcrumbActive }) => {
  return (
    <div className="page-header-section section-gap-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 col-md-6 col-12">
            <div className="page-header-content">
              <h1 className="title">{title}</h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {breadcrumbActive}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className="col-lg-5 col-md-6 col-12">
            <div className="page-header-img">
               {/* Optional: Add an image here if your design requires it */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;