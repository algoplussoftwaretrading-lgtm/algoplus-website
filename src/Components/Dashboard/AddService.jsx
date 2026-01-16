import React, { useState, useEffect } from "react";
import { serviceData } from "../../Data/SiteData"; // Import current data

const AddService = () => {
  // 1. Initialize State with existing data
  const [items, setItems] = useState(serviceData);
  
  // 2. Form State
  const [formData, setFormData] = useState({ 
      id: "", 
      title: "", 
      description: "", 
      icon: "fa-solid fa-star", 
      slug: "", 
      content: "" 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  // 3. Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Add or Update Item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update existing item
      setItems(items.map(item => item.id === formData.id ? formData : item));
      setIsEditing(false);
    } else {
      // Add new item
      const newItem = { ...formData, id: Date.now() }; // Generate unique ID
      setItems([...items, newItem]);
    }
    // Reset Form
    setFormData({ id: "", title: "", description: "", icon: "fa-solid fa-star", slug: "", content: "" });
  };

  // 5. Delete Item
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // 6. Load Item into Edit Form
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    // Scroll to top to see form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 7. Generate Code Automatically whenever 'items' changes
  useEffect(() => {
    const code = `export const serviceData = ${JSON.stringify(items, null, 2)};`;
    setGeneratedCode(code);
  }, [items]);

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2>Manage Services</h2>
        <span className="badge bg-primary fs-6">{items.length} Active Services</span>
      </div>
      
      <div className="row g-4">
        {/* RIGHT COLUMN: FORM (Moved to top/left on mobile for easier access) */}
        <div className="col-lg-7 order-lg-2">
            <div className="card shadow-sm border-0">
                <div className={`card-header text-white ${isEditing ? "bg-warning" : "bg-primary"}`}>
                    <h5 className="mb-0">{isEditing ? "Edit Service" : "Add New Service"}</h5>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Service Title</label>
                                <input 
                                    type="text" 
                                    name="title" 
                                    className="form-control" 
                                    placeholder="e.g. Cloud Computing"
                                    value={formData.title} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Slug (URL Link)</label>
                                <input 
                                    type="text" 
                                    name="slug" 
                                    className="form-control" 
                                    placeholder="e.g. cloud-computing"
                                    value={formData.slug} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Icon Class (FontAwesome)</label>
                            <div className="input-group">
                                <span className="input-group-text"><i className={formData.icon || "fa-solid fa-star"}></i></span>
                                <input 
                                    type="text" 
                                    name="icon" 
                                    className="form-control" 
                                    placeholder="e.g. fa-solid fa-cloud"
                                    value={formData.icon} 
                                    onChange={handleChange} 
                                />
                            </div>
                            <small className="text-muted">Use free icons from FontAwesome 6.</small>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Short Description (Card)</label>
                            <textarea 
                                name="description" 
                                className="form-control" 
                                rows="2" 
                                placeholder="Brief summary shown on the home page card..."
                                value={formData.description} 
                                onChange={handleChange} 
                                required
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Full Content (Detail Page)</label>
                            <textarea 
                                name="content" 
                                className="form-control" 
                                rows="5" 
                                placeholder="Detailed description shown on the single service page..."
                                value={formData.content} 
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        
                        <div className="d-grid gap-2">
                            <button type="submit" className={`btn btn-lg ${isEditing ? "btn-warning text-dark" : "btn-primary"}`}>
                                {isEditing ? "Update Service" : "Add Service"}
                            </button>
                            {isEditing && (
                                <button type="button" className="btn btn-secondary" onClick={() => { setIsEditing(false); setFormData({ id: "", title: "", description: "", icon: "", slug: "", content: "" }) }}>
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>

        {/* LEFT COLUMN: LIST OF SERVICES */}
        <div className="col-lg-5 order-lg-1">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white">
                    <h5 className="mb-0">Current Services List</h5>
                </div>
                <div className="list-group list-group-flush">
                    {items.map(item => (
                        <div key={item.id} className="list-group-item p-3">
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 className="mb-1 fw-bold text-primary">
                                        <i className={`${item.icon} me-2`}></i>{item.title}
                                    </h6>
                                    <small className="text-muted d-block mb-2">/{item.slug}</small>
                                    <p className="mb-0 small text-secondary" style={{lineHeight: '1.4'}}>
                                        {item.description.substring(0, 60)}...
                                    </p>
                                </div>
                                <div className="btn-group-vertical ms-2">
                                    <button className="btn btn-sm btn-outline-warning mb-1" onClick={() => handleEdit(item)} title="Edit">
                                        <i className="fa-solid fa-pen"></i>
                                    </button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)} title="Delete">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* GENERATED CODE SECTION */}
      <div className="mt-5 p-4 bg-dark text-white rounded shadow-lg">
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0"><i className="fa-solid fa-code me-2 text-warning"></i> Save Your Changes</h4>
            <button className="btn btn-warning fw-bold" onClick={() => navigator.clipboard.writeText(generatedCode)}>
                <i className="fa-regular fa-copy me-2"></i> Copy Code
            </button>
        </div>
        <div className="alert alert-info">
            <i className="fa-solid fa-circle-info me-2"></i>
            <strong>Action Required:</strong> Since this is a static site (no database), you must copy the code below and replace the <strong>serviceData</strong> section in your <code>src/Data/SiteData.js</code> file to make these changes permanent.
        </div>
        <textarea className="form-control bg-black text-success font-monospace border-0" style={{fontSize: '12px'}} rows="8" readOnly value={generatedCode}></textarea>
      </div>

    </div>
  );
};

export default AddService;