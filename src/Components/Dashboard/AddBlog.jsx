import React, { useState, useEffect } from "react";
// 1. Import existing data safely
import { blogData as initialData } from "../../Data/SiteData";

const AddBlog = () => {
  const [list, setList] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [blobUrl, setBlobUrl] = useState(""); // Stores temporary upload preview

  // Auto-generate today's date for new posts
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  // 2. Added 'altText' to the state
  const [formData, setFormData] = useState({ 
    id: null, title: "", category: "", date: today, excerpt: "", image: "", altText: "", link: "" 
  });

  // --- HANDLERS ---

  // Handle File Upload (Auto-fill path + Instant Preview)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a temporary local URL so the image shows instantly
      const objectUrl = URL.createObjectURL(file);
      setBlobUrl(objectUrl);

      // Auto-write the correct file path for the code
      setFormData({ ...formData, image: `/assets/images/blog/${file.name}` });
    }
  };

  // Load Item for Editing
  const handleEdit = (item) => {
    setIsEditing(true);
    setFormData(item);
    setBlobUrl(""); // Clear temporary blob, rely on the real path
  };

  // Delete Item
  const handleDelete = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
  };

  // Add or Update List (This triggers the Code Generation update)
  const handleSave = () => {
    let newList;
    if (isEditing) {
      newList = list.map((item) => (item.id === formData.id ? formData : item));
      setIsEditing(false);
    } else {
      newList = [...list, { ...formData, id: Date.now() }];
    }
    setList(newList);

    // Reset Form
    setFormData({ id: null, title: "", category: "", date: today, excerpt: "", image: "", altText: "", link: "" });
    setBlobUrl(""); // Clear preview
  };

  // 3. GENERATE CODE (Based on the updated 'list')
  const generatedCode = `export const blogData = ${JSON.stringify(list, null, 2)};`;

  return (
    <div className="container mt-5 mb-5">
      <h2>Manage Blogs</h2>
      <div className="row">
        
        {/* --- LEFT COLUMN: LIST --- */}
        <div className="col-lg-4">
          <div className="list-group shadow-sm" style={{maxHeight: '600px', overflowY: 'auto'}}>
            {list.map((item) => (
              <div key={item.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                <div>
                   <h6 className="m-0" style={{fontSize: "0.9rem", fontWeight: "600"}}>{item.title}</h6>
                   <small className="text-muted" style={{fontSize: "0.8rem"}}>{item.date}</small>
                </div>
                <div style={{minWidth: "70px", textAlign: "right"}}>
                  <button className="btn btn-sm btn-light me-1" onClick={() => handleEdit(item)}><i className="fa-solid fa-pen"></i></button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary w-100 mt-3" onClick={() => { 
              setIsEditing(false); 
              setFormData({ id: null, title: "", category: "", date: today, excerpt: "", image: "", altText: "", link: "" }); 
              setBlobUrl("");
          }}>
            + Create New Post
          </button>
        </div>

        {/* --- RIGHT COLUMN: EDITOR --- */}
        <div className="col-lg-8">
          <div className="card p-4 bg-light border-0 shadow-sm">
            <h4 className="mb-4">{isEditing ? "Edit Blog Post" : "Add New Blog Post"}</h4>
            
            {/* Title & Category */}
            <div className="row">
                <div className="col-12 mb-3">
                    <label className="form-label fw-bold">Blog Title</label>
                    <input className="form-control" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. 5 Tips for SEO" />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Category</label>
                    <input className="form-control" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Technology" />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Date</label>
                    <input type="text" className="form-control" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
            </div>

            {/* Excerpt */}
            <div className="mb-3">
                <label className="form-label">Excerpt (Short Summary)</label>
                <textarea className="form-control" rows="3" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})}></textarea>
            </div>

            {/* Image Upload Section */}
            <div className="card p-3 mb-3 border-secondary">
                <h6 className="text-primary"><i className="fa-solid fa-image"></i> Image Settings</h6>
                <div className="row">
                    <div className="col-md-6 mb-2">
                        <label className="form-label small">Upload Image (Auto-detects name)</label>
                        <input type="file" className="form-control" onChange={handleImageUpload} />
                    </div>
                    <div className="col-md-6 mb-2">
                         <label className="form-label small">Image Path (Code)</label>
                         <input className="form-control bg-white" readOnly value={formData.image} />
                    </div>
                    {/* ALT TEXT INPUT */}
                    <div className="col-12 mt-2">
                         <label className="form-label small">Alt Text (For SEO)</label>
                         <input className="form-control" value={formData.altText} onChange={e => setFormData({...formData, altText: e.target.value})} placeholder="Describe the image..." />
                    </div>
                </div>

                {/* --- LIVE PREVIEW --- */}
                {(blobUrl || formData.image) && (
                    <div className="mt-3 p-2 bg-white text-center border rounded">
                        <p className="mb-1 text-muted small text-uppercase fw-bold">Live Preview</p>
                        <img 
                            src={blobUrl || formData.image} 
                            alt="Preview" 
                            style={{maxHeight: '200px', maxWidth: '100%', objectFit: 'cover', borderRadius: '4px'}} 
                            onError={(e) => {
                                // If image fails to load (e.g. manual path not saved yet), hide it nicely
                                e.target.style.display = 'none'; 
                            }}
                        />
                        {/* Show Alt text preview if image breaks or just for info */}
                        <small className="d-block text-muted mt-1">{formData.altText || "No alt text provided"}</small>
                    </div>
                )}
            </div>
            
            <div className="row">
                 <div className="col-12">
                    <label className="form-label">Link</label>
                    <input className="form-control" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} placeholder="/blog/my-post" />
                 </div>
            </div>

            <button className="btn btn-success w-100 mt-4 py-2 fw-bold" onClick={handleSave}>
                <i className="fa-solid fa-check"></i> {isEditing ? "Update Post" : "Add to List"}
            </button>
            <small className="text-center d-block mt-2 text-muted">You must click "Add/Update" above before the code generates.</small>
          </div>

          {/* CODE GENERATOR */}
          <div className="mt-4 p-3 bg-dark text-white rounded">
            <div className="d-flex justify-content-between align-items-center mb-2">
               <strong><i className="fa-solid fa-code"></i> Generated Code for SiteData.js</strong>
               <button className="btn btn-sm btn-outline-warning" onClick={() => navigator.clipboard.writeText(generatedCode)}>Copy Code</button>
            </div>
            <textarea className="form-control bg-black text-warning font-monospace" style={{fontSize: "0.85rem"}} rows="8" readOnly value={generatedCode}></textarea>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddBlog;