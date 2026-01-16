import React from "react";
// ✅ Import the data
import { serviceData } from "../../Data/SiteData";
import ServiceCard from "../Card/ServiceCard"; 
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

function ServiceSection() {
  // Safety Check: If data is missing, don't crash the app
  if (!serviceData) return <p>Loading Services...</p>;

  return (
    <div className="section">
       <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
             {serviceData.map((item) => (
                 <div className="col" key={item.id}>
                    <ServiceCard 
                        id={item.slug} // ✅ Using Slug for link
                        icon={item.icon} 
                        title={item.title} 
                        content={item.description} // ✅ Short text for the card
                        className="h-100"
                    />
                 </div>
             ))}
          </div>
       </div>
    </div>
  );
}

export default ServiceSection;