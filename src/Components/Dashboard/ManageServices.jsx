import React, { useState, useEffect } from "react";
import { serviceData } from "../../Data/SiteData"; // Import current data

const ManageServices = () => {
  // 1. Initialize State with existing data
  const [items, setItems] = useState(serviceData);
  
  // 2. Form State
  const [formData, setFormData] = useState({ id: "", title: "", description: "", icon: "fa-solid fa-star", slug: "", content: "" });
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
    if (window.confirm("Are you sure?")) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  // 6. Load Item into Edit Form
  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
  };

  // 7. Generate Code
  useEffect(() => {
    const code = `export const serviceData = ${JSON.stringify(items, null, 2)};`;
    setGeneratedCode(code);
  }, [items]);

  return (
    <div className="container mt-5 mb-5">
      <h2 className="mb-4">Manage Services</h2>
      
      <div className="row">
        {/* LEFT COLUMN: LIST OF SERVICES */}
        <div className="col-md-5">
            <div className="list-group shadow-sm">
                {items.map(item => (
                    <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center p-3">
                        <div>
                            <h5 className="mb-1">{item.title}</h5>
                            <small className="text-muted">{item.description.substring(0, 30)}...</small>
                        </div>
                        <div>
                            <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(item)}>
                                <i className="fa-solid fa-pen"></i>
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* RIGHT COLUMN: FORM */}
        <div className="col-md-7">
            <div className="card shadow-sm p-4">
                <h4>{isEditing ? "Edit Service" : "Add New Service"}</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Title</label>
                        <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Slug (URL Link)</label>
                        <input type="text" name="slug" className="form-control" value={formData.slug} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label>Icon Class (FontAwesome)</label>
                        <input type="text" name="icon" className="form-control" value={formData.icon} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label>Short Description (Card)</label>
                        <textarea name="description" className="form-control" rows="2" value={formData.description} onChange={handleChange} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label>Full Content (Detail Page)</label>
                        <textarea name="content" className="form-control" rows="4" value={formData.content} onChange={handleChange}></textarea>
                    </div>
                    
                    <button type="submit" className={`btn w-100 ${isEditing ? "btn-warning" : "btn-primary"}`}>
                        {isEditing ? "Update Service" : "Add Service"}
                    </button>
                    {isEditing && (
                        <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => { setIsEditing(false); setFormData({ id: "", title: "", description: "", icon: "", slug: "", content: "" }) }}>
                            Cancel Edit
                        </button>
                    )}
                </form>
            </div>
        </div>
      </div>

      {/* GENERATED CODE SECTION */}
      <div className="mt-5 p-4 bg-dark text-white rounded">
        <h4><i className="fa-solid fa-code me-2"></i> Save Your Changes</h4>
        <p className="text-white-50">Since this is a static site, you must copy this code below and paste it into <code>src/Data/SiteData.js</code> to make changes permanent.</p>
        <textarea className="form-control bg-secondary text-white font-monospace" rows="10" readOnly value={generatedCode}></textarea>
        <button className="btn btn-light mt-3" onClick={() => navigator.clipboard.writeText(generatedCode)}>
            Copy to Clipboard
        </button>
      </div>

    </div>
  );
};

export default ManageServices;  