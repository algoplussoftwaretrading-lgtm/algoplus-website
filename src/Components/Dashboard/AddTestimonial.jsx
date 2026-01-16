import React, { useState } from "react";
import { testimonialData as initialData } from "../../Data/SiteData";

const AddTestimonial = () => {
  const [list, setList] = useState(initialData);
  const [formData, setFormData] = useState({ 
    id: null, name: "", role: "", review: "", rating: 5, image: "" 
  });
  const [isEditing, setIsEditing] = useState(false);

  // EDIT
  const handleEdit = (item) => {
    setIsEditing(true);
    setFormData(item);
  };

  // DELETE
  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  // SAVE
  const handleSave = () => {
    if (isEditing) {
      setList(list.map((item) => (item.id === formData.id ? formData : item)));
      setIsEditing(false);
    } else {
      setList([...list, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: null, name: "", role: "", review: "", rating: 5, image: "" });
  };

  const generatedCode = `export const testimonialData = ${JSON.stringify(list, null, 2)};`;

  return (
    <div className="container mt-5 mb-5">
      <h2>Manage Testimonials</h2>
      <div className="row">
        
        {/* LIST */}
        <div className="col-lg-4">
          <div className="list-group shadow-sm">
            {list.map((item) => (
              <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                   <img src={item.image} alt="client" className="rounded-circle me-2" width="30" height="30" style={{objectFit: "cover"}} />
                   <div>
                     <h6 className="m-0" style={{fontSize: "0.9rem"}}>{item.name}</h6>
                     <small className="text-warning">{"★".repeat(item.rating)}</small>
                   </div>
                </div>
                <div>
                  <button className="btn btn-sm btn-light" onClick={() => handleEdit(item)}><i className="fa-solid fa-pen"></i></button>
                  <button className="btn btn-sm btn-danger ms-1" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary w-100 mt-3" onClick={() => { setIsEditing(false); setFormData({ id: null, name: "", role: "", review: "", rating: 5, image: "" }); }}>+ Add Testimonial</button>
        </div>

        {/* EDITOR */}
        <div className="col-lg-8">
          <div className="card p-4 bg-light border-0">
            <h4>{isEditing ? "Edit Testimonial" : "Add Testimonial"}</h4>
            
            <div className="row">
                <div className="col-md-6 mb-2">
                    <label>Client Name</label>
                    <input className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="col-md-6 mb-2">
                    <label>Role / Company</label>
                    <input className="form-control" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                </div>
            </div>

            <label className="mt-2">Review</label>
            <textarea className="form-control" rows="3" value={formData.review} onChange={e => setFormData({...formData, review: e.target.value})}></textarea>

            <div className="row mt-2">
                <div className="col-md-6">
                    <label>Rating (1-5)</label>
                    <input type="number" min="1" max="5" className="form-control" value={formData.rating} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} />
                </div>
                <div className="col-md-6">
                    <label>Image Path</label>
                    <input className="form-control" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} />
                </div>
            </div>

            <button className="btn btn-success w-100 mt-3" onClick={handleSave}>{isEditing ? "Update" : "Add"}</button>
          </div>

          <div className="mt-4 p-3 bg-dark text-white rounded">
            <strong>⚠️ Copy Code to SiteData.js</strong>
            <textarea className="form-control bg-black text-warning mt-2" rows="6" readOnly value={generatedCode}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTestimonial;