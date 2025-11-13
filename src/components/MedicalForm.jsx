import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { FaUser, FaCalendar, FaStethoscope, FaFileMedical, FaPlus, FaTrash } from "react-icons/fa";
import "./MedicalForm.css";

const MedicalForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    bloodGroup: "",
    gender: "",
    medicalHistory: "",
    allergies: "",
    medications: "",
    existingConditions: "",
    lastUpdated: new Date().toISOString(),
    familyMembers: []
  });
  const [newFamilyMember, setNewFamilyMember] = useState({
    name: "",
    relationship: "",
    phone: "",
    email: "",
    address: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchExistingData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("Please log in to access the medical form");
          setLoading(false);
          return;
        }

        const docRef = doc(db, "medicalForms", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            ...data,
            familyMembers: Array.isArray(data.familyMembers) ? data.familyMembers : []
          });
        }
      } catch (error) {
        console.error("Error fetching medical data:", error);
        setError("Failed to load medical data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchExistingData();
  }, [auth.currentUser, db]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      lastUpdated: new Date().toISOString()
    }));
  };

  const handleFamilyMemberChange = (e) => {
    const { name, value } = e.target;
    setNewFamilyMember(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addFamilyMember = () => {
    if (!newFamilyMember.name || !newFamilyMember.phone) {
      setError("Name and phone number are required for family members");
      return;
    }

    setFormData(prev => ({
      ...prev,
      familyMembers: [...(prev.familyMembers || []), newFamilyMember]
    }));

    setNewFamilyMember({
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: ""
    });
  };

  const removeFamilyMember = (index) => {
    setFormData(prev => ({
      ...prev,
      familyMembers: (prev.familyMembers || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("No authenticated user found");

      await setDoc(doc(db, "medicalForms", user.uid), formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving medical data:", error);
      setError("Failed to save medical data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="medical-form-container">
      <div className="medical-form-card">
        <div className="medical-form-header">
          <h1 className="medical-form-title">Medical Information</h1>
          <p className="medical-form-subtitle">Please fill in your medical details</p>
        </div>

        <form className="medical-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Age</label>
            <div className="input-wrapper">
              <FaCalendar className="input-icon" />
              <input
                type="number"
                name="age"
                className="form-input"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                required
                min="0"
                max="120"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Blood Group</label>
            <div className="input-wrapper">
              <FaFileMedical className="input-icon" />
              <select
                name="bloodGroup"
                className="form-input"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Gender</label>
            <div className="input-wrapper">
              <FaUser className="input-icon" />
              <select
                name="gender"
                className="form-input"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Medical History</label>
            <div className="input-wrapper">
              <FaStethoscope className="input-icon" />
              <textarea
                name="medicalHistory"
                className="form-input form-textarea"
                placeholder="Enter your medical history"
                value={formData.medicalHistory}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Allergies</label>
            <div className="input-wrapper">
              <FaFileMedical className="input-icon" />
              <textarea
                name="allergies"
                className="form-input form-textarea"
                placeholder="List any allergies"
                value={formData.allergies}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Current Medications</label>
            <div className="input-wrapper">
              <FaFileMedical className="input-icon" />
              <textarea
                name="medications"
                className="form-input form-textarea"
                placeholder="List current medications"
                value={formData.medications}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Existing Conditions</label>
            <div className="input-wrapper">
              <FaFileMedical className="input-icon" />
              <textarea
                name="existingConditions"
                className="form-input form-textarea"
                placeholder="List any existing conditions"
                value={formData.existingConditions}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Family Members Section */}
          <div className="family-members-section">
            <h2>Family Members</h2>
            <div className="add-family-member">
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newFamilyMember.name}
                  onChange={handleFamilyMemberChange}
                  className="form-input"
                  placeholder="Enter name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Relationship</label>
                <input
                  type="text"
                  name="relationship"
                  value={newFamilyMember.relationship}
                  onChange={handleFamilyMemberChange}
                  className="form-input"
                  placeholder="Enter relationship"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={newFamilyMember.phone}
                  onChange={handleFamilyMemberChange}
                  className="form-input"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newFamilyMember.email}
                  onChange={handleFamilyMemberChange}
                  className="form-input"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newFamilyMember.address}
                  onChange={handleFamilyMemberChange}
                  className="form-input"
                  placeholder="Enter address"
                />
              </div>
              <button
                type="button"
                className="add-member-button"
                onClick={addFamilyMember}
              >
                <FaPlus /> Add Member
              </button>
            </div>

            <div className="family-members-list">
              {(formData.familyMembers || []).map((member, index) => (
                <div key={index} className="family-member-card">
                  <div className="member-info">
                    <h3>{member.name}</h3>
                    <p>{member.relationship}</p>
                    <p>{member.phone}</p>
                    <p>{member.email}</p>
                    <p>{member.address}</p>
                  </div>
                  <button
                    type="button"
                    className="remove-member-button"
                    onClick={() => removeFamilyMember(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={() => navigate("/dashboard")}>
              Cancel
            </button>
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? "Saving..." : "Save Medical Information"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalForm;
