import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardHub = () => {
  const navigate = useNavigate();

  // Security Check
  useEffect(() => {
    if (!sessionStorage.getItem("isLoggedIn")) {
      navigate("/login");
    }
  }, [navigate]);

  const menuItems = [
    { name: "Manage Services", link: "/dashboard/service", icon: "fa-cogs", color: "bg-info" }, // ✅ Added Service
    { name: "Manage Pricing", link: "/dashboard/pricing", icon: "fa-tags", color: "bg-primary" },
    { name: "Manage Blogs", link: "/dashboard/blog", icon: "fa-pen-nib", color: "bg-success" },
    { name: "Manage Team", link: "/dashboard/team", icon: "fa-users", color: "bg-warning" },
    { name: "Manage FAQ", link: "/dashboard/faq", icon: "fa-circle-question", color: "bg-secondary" }, // ✅ Added FAQ
  ];

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h1 className="fw-bold">Admin Dashboard</h1>
        <button className="btn btn-danger" onClick={() => {
            sessionStorage.removeItem("isLoggedIn");
            navigate("/login");
        }}>
           <i className="fa-solid fa-right-from-bracket me-2"></i> Logout
        </button>
      </div>

      <div className="row g-4">
        {menuItems.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <Link to={item.link} className="text-decoration-none">
              <div className={`card text-white ${item.color} h-100 shadow-sm border-0`} style={{transition: 'transform 0.3s'}}>
                <div className="card-body text-center d-flex flex-column justify-content-center p-5">
                  <i className={`fa-solid ${item.icon} fa-3x mb-3`}></i>
                  <h4 className="fw-bold">{item.name}</h4>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHub;