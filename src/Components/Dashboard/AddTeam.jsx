import React, { useState, useEffect } from "react";
import { teamData } from "../../Data/SiteData"; 

const AddTeam = () => {
  // 1. Initialize State
  const [members, setMembers] = useState(teamData || []);
  
  // 2. Form State (Added Facebook & Instagram)
  const [formData, setFormData] = useState({ 
      id: "", 
      name: "", 
      role: "", 
      image: "", 
      linkedin: "",
      facebook: "",
      instagram: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const imagePath = formData.image.trim() === "" ? "/assets/images/dummy-img-400x400.webp" : formData.image;
    const finalData = { ...formData, image: imagePath };

    if (isEditing) {
      setMembers(members.map(item => item.id === formData.id ? finalData : item));
      setIsEditing(false);
    } else {
      const newMember = { ...finalData, id: Date.now() };
      setMembers([...members, newMember]);
    }
    // Reset Form including new fields
    setFormData({ id: "", name: "", role: "", image: "", linkedin: "", facebook: "", instagram: "" });
  };

  const handleDelete = (id) => {
    if(window.confirm("Remove this member?")) {
        setMembers(members.filter(m => m.id !== id));
    }
  };

  const handleEdit = (member) => {
    // Fill form with existing data (ensure new fields aren't undefined)
    setFormData({
        ...member,
        facebook: member.facebook || "",
        instagram: member.instagram || ""
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const code = `export const teamData = ${JSON.stringify(members, null, 2)};`;
    setGeneratedCode(code);
  }, [members]);

  return (
    <div className="container mt-5 mb-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2>Manage Team</h2>
        <span className="badge bg-primary fs-6">{members.length} Members</span>
      </div>
      
      <div className="row g-4">
        {/* FORM SECTION */}
        <div className="col-lg-7 order-lg-2">
            <div className="card shadow-sm border-0">
                <div className={`card-header text-white ${isEditing ? "bg-warning" : "bg-primary"}`}>
                    <h5 className="mb-0">{isEditing ? "Edit Member" : "Add New Member"}</h5>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Name</label>
                                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6 mb-3">
                                <label className="form-label fw-bold">Role</label>
                                <input type="text" name="role" className="form-control" value={formData.role} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Image Path</label>
                            <input type="text" name="image" className="form-control" value={formData.image} onChange={handleChange} />
                        </div>
                        
                        {/* SOCIAL MEDIA SECTION */}
                        <label className="form-label fw-bold mt-2">Social Links</label>
                        <div className="input-group mb-2">
                            <span className="input-group-text"><i className="fa-brands fa-linkedin"></i></span>
                            <input type="text" name="linkedin" className="form-control" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} />
                        </div>
                        <div className="input-group mb-2">
                            <span className="input-group-text"><i className="fa-brands fa-facebook"></i></span>
                            <input type="text" name="facebook" className="form-control" placeholder="Facebook URL" value={formData.facebook} onChange={handleChange} />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><i className="fa-brands fa-instagram"></i></span>
                            <input type="text" name="instagram" className="form-control" placeholder="Instagram URL" value={formData.instagram} onChange={handleChange} />
                        </div>
                        
                        <div className="d-grid gap-2">
                            <button type="submit" className={`btn btn-lg ${isEditing ? "btn-warning text-dark" : "btn-success"}`}>
                                {isEditing ? "Update Member" : "Add Member"}
                            </button>
                            {isEditing && (
                                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>

        {/* LIST SECTION */}
        <div className="col-lg-5 order-lg-1">
            <div className="card shadow-sm border-0">
                <div className="card-header bg-dark text-white"><h5>Current Team</h5></div>
                <div className="list-group list-group-flush">
                    {members.map(m => (
                        <div key={m.id} className="list-group-item p-3">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <img src={m.image} alt="avatar" className="rounded-circle me-3" width="50" height="50" style={{objectFit:'cover'}} />
                                    <div>
                                        <h6 className="mb-0 fw-bold">{m.name}</h6>
                                        <small className="text-muted">{m.role}</small>
                                    </div>
                                </div>
                                <div>
                                    <button className="btn btn-sm btn-outline-warning me-1" onClick={() => handleEdit(m)}><i className="fa-solid fa-pen"></i></button>
                                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(m.id)}><i className="fa-solid fa-trash"></i></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      <div className="mt-5 p-4 bg-dark text-white rounded">
        <h4><i className="fa-solid fa-code me-2"></i> Save Changes</h4>
        <textarea className="form-control bg-black text-success border-0 font-monospace" rows="8" readOnly value={generatedCode}></textarea>
        <button className="btn btn-warning mt-2" onClick={() => navigator.clipboard.writeText(generatedCode)}>Copy Code</button>
      </div>
    </div>
  );
};

export default AddTeam;