import { useParams, Link } from "react-router-dom";
// ✅ Go back 2 levels if in src/Page/Service/index.jsx
import { serviceData } from "../../Data/SiteData"; 
import PageHeader from "../../Components/Banner/PageHeader";
import ServiceSection from "../../Components/Services/services";

const ServicePage = () => {
  const { id } = useParams(); // This captures "microsoft", "ai-voice", etc.

  // --- 1. SINGLE SERVICE DETAILS ---
  if (id) {
    // ✅ NEW LOGIC: Check if 'slug' matches OR if 'id' matches
    const service = serviceData.find((item) => item.slug === id || item.id.toString() === id);
    
    // Safety Check
    if (!service) return (
        <div className="text-center mt-5">
            <h1>Service Not Found</h1>
            <p>We couldn't find the service: {id}</p>
            <Link to="/service" className="btn btn-primary mt-3">Back to Services</Link>
        </div>
    );

    return (
       <>
         <PageHeader title={service.title} breadcrumbActive="Services" />
         <div className="section">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-lg-6">
                     <div className="icon-box bg-primary text-white d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{width: "80px", height: "80px", fontSize: "2rem"}}>
                        {typeof service.icon === 'string' && service.icon.includes('/') 
                            ? <img src={service.icon} style={{width:'40px'}} alt="icon"/> 
                            : <i className={service.icon}></i>
                        }
                     </div>
                     <h2 className="display-5 fw-bold mb-3">{service.title}</h2>
                     <p className="lead text-muted">{service.description}</p>
                     
                     <div className="mt-4">
                        <p>{service.content}</p>
                     </div>

                     <Link to="/service" className="btn btn-dark mt-4">View All Services</Link>
                  </div>
                  
                  {/* Optional: Add an image column here if you have service images */}
                  <div className="col-lg-6">
                      <div className="p-5 bg-light rounded-3 text-center">
                          <i className={`${service.icon} fa-5x text-secondary`}></i>
                      </div>
                  </div>

               </div>
            </div>
         </div>
       </>
    );
  }

  // --- 2. SERVICE LIST (Default View) ---
  return (
    <>
      <PageHeader title="Our Services" breadcrumbActive="Service" />
      <ServiceSection />
    </>
  );
};

export default ServicePage;
