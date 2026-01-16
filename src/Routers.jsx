import { Routes, Route } from "react-router-dom";

// PAGES
import HomePage from "./Page/Home";
import AboutPage from "./Page/About";
import ServicePage from "./Page/Service"; // Handles List AND Single
import BlogPage from "./Page/Blog";       // Handles List AND Single
import CaseStudiesPage from "./Page/CaseStudies";
import TeamPage from "./Page/Team";
import PartnershipPage from "./Page/Partnership";
import PricingPage from "./Page/Pricing";
import TestimonialPage from "./Page/Testimonial";
import NotFoundPage from "./Page/NotFound";
import FaqPage from "./Page/FAQs";
import ContactPage from "./Page/Contact";

// DASHBOARD
import Login from "./Components/Dashboard/Login";
import DashboardHub from "./Components/Dashboard/DashboardHub";
import AddPricing from "./Components/Dashboard/AddPricing";
import AddBlog from "./Components/Dashboard/AddBlog";
import AddTestimonial from "./Components/Dashboard/AddTestimonial";
import AddService from "./Components/Dashboard/AddService";
import AddTeam from "./Components/Dashboard/AddTeam";

function AppRouter(){
    return (
        <Routes>
            {/* PUBLIC PAGES */}
            <Route path="/" element={<HomePage />}/>
            <Route path="about" element={<AboutPage />}/>
            
            {/* ✅ DYNAMIC SERVICES ROUTE */}
            <Route path="service" element={<ServicePage />} />      {/* List */}
            <Route path="service/:id" element={<ServicePage />} />  {/* Detail (Same File) */}

            {/* ✅ DYNAMIC BLOG ROUTE */}
            <Route path="blog" element={<BlogPage />} />            {/* List */}
            <Route path="blog/:id" element={<BlogPage />} />        {/* Detail (Same File) */}

            <Route path="case_studies" element={<CaseStudiesPage />}/>
            <Route path="team" element={<TeamPage />}/>
            <Route path="partnership" element={<PartnershipPage />}/>      
            <Route path="pricing" element={<PricingPage />}/>
            <Route path="Testimonial" element={<TestimonialPage />}/>
            <Route path="faq" element={<FaqPage />}/>
            <Route path="contact" element={<ContactPage />}/>

            {/* DASHBOARD */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<DashboardHub />} />
            <Route path="/dashboard/pricing" element={<AddPricing />} />
            <Route path="/dashboard/blog" element={<AddBlog />} />
            <Route path="/dashboard/testimonial" element={<AddTestimonial />} />
            <Route path="/dashboard/service" element={<AddService />} />
            <Route path="/dashboard/team" element={<AddTeam />} />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />}/>
        </Routes>
    );
}

export default AppRouter;