import React, { useState, useEffect } from "react";
import { pricingData } from "../../Data/SiteData"; 

const AddPricing = () => {
  const [items, setItems] = useState(pricingData || []);
  
  // ✅ Added 'description' to state
  const [formData, setFormData] = useState({ 
      id: "", 
      plan: "", 
      price: "", 
      description: "", 
      features: "", 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const featureArray = formData.features.split(',').map(f => f.trim()).filter(f => f !== "");

    const finalData = { ...formData, features: featureArray };

    if (isEditing) {
      setItems(items.map(item => item.id === formData.id ? finalData : item));
      setIsEditing(false);
    } else {
      const newItem = { ...finalData, id: Date.now() }; 
      setItems([...items, newItem]);
    }
    setFormData({ id: "", plan: "", price: "", description: "", features: "" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this plan?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    setFormData({
        ...item,
        features: item.features.join(", ") 
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const code = `export const pricingData = ${JSON.stringify(items, null, 2)};`;
    setGeneratedCode(code);
  }, [items]);

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2>Manage Pricing Plans</h2>
        <span className="badge bg-primary">{items.length} Plans</span>
      </div>
      
      <div className="row g-4">
        {/* EDITOR FORM */}
        <div className="col-lg-7 order-lg-2">
            <div className="card shadow-sm border-0">
                <div className={`card-header text-white ${isEditing ? "bg-warning" : "bg-primary"}`}>
                    <h5 className="mb-0">{isEditing ? "Edit Plan" : "Add New Plan"}</h5>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="fw-bold">Plan Name</label>
                                <input type="text" name="plan" className="form-control" placeholder="e.g. Starter" value={formData.plan} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="fw-bold">Price</label>
                                <input type="text" name="price" className="form-control" placeholder="e.g. $99" value={formData.price} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* ✅ NEW DESCRIPTION FIELD */}
                        <div className="mb-3">
                            <label className="fw-bold">Short Description</label>
                            <input type="text" name="description" className="form-control" placeholder="e.g. Perfect for startups & small businesses" value={formData.description} onChange={handleChange} />
                        </div>

                        <div className="mb-3">
                            <label className="fw-bold">Features (Comma Separated)</label>
                            <textarea name="features" className="form-control" rows="5" placeholder="Feature 1, Feature 2..." value={formData.features} onChange={handleChange} required></textarea>
                        </div>
                        
                        <button type="submit" className={`btn w-100 ${isEditing ? "btn-warning" : "btn-primary"}`}>
                            {isEditing ? "Update Plan" : "Add Plan"}
                        </button>
                    </form>
                </div>
            </div>
        </div>

        {/* PREVIEW LIST */}
        <div className="col-lg-5 order-lg-1">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white"><h5>Current Plans</h5></div>
                <div className="list-group list-group-flush">
                    {items.map((item, index) => (
                        <div key={item.id} className="list-group-item p-3">
                            <div className="d-flex justify-content-between align-items-center">
                                <h6 className="fw-bold mb-0">#{index + 1} {item.plan}</h6>
                                <span className="badge bg-success">{item.price}</span>
                            </div>
                            <small className="text-muted d-block mb-2">{item.description}</small>
                            <div className="d-flex justify-content-end gap-2">
                                <button className="btn btn-sm btn-outline-warning" onClick={() => handleEdit(item)}><i className="fa-solid fa-pen"></i></button>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="mt-5 p-4 bg-dark text-white rounded">
        <h4><i className="fa-solid fa-code me-2"></i> Save Your Changes</h4>
        <textarea className="form-control bg-black text-success font-monospace border-0" rows="8" readOnly value={generatedCode}></textarea>
        <button className="btn btn-warning mt-2" onClick={() => navigator.clipboard.writeText(generatedCode)}>Copy Code</button>
      </div>
    </div>
  );
};

export default AddPricing;