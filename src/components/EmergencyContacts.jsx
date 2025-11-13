import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { FaPhone } from 'react-icons/fa';
import './EmergencyContacts.css';

const EmergencyContacts = () => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const auth = getAuth();
  const db = getFirestore();
  const { t } = useTranslation();

  // Sample doctor data
  const doctors = [
    {
      name: "Dr. Ganesh Prabhakar",
      specialty: "General Physician",
      phone: "+91 9822000000",
      email: "dr.ganesh@example.com",
      address: "123 Medical Center, Health Street, City"
    },
    {
      name: "Dr. Shambhavi Kulkarni",
      specialty: "Cardiologist",
      phone: "+91 9822000000",
      email: "dr.shambhavi@example.com",
      address: "456 Heart Clinic, Wellness Avenue, City"
    }
  ];

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        // Get the medical form document for the current user
        const medicalFormRef = doc(db, "medicalForms", user.uid);
        const medicalFormSnap = await getDoc(medicalFormRef);
        
        if (medicalFormSnap.exists()) {
          const formData = medicalFormSnap.data();
          // Get family members from the form data
          const members = formData.familyMembers || [];
          // Take only the first 3 family members
          setFamilyMembers(members.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching family members:", error);
        setError(t('error_loading_contacts'));
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyMembers();
  }, [auth.currentUser, db, t]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="emergency-contacts-container">
      <div className="emergency-contacts-card">
        <h1 className="emergency-contacts-title">{t('Emergency Contacts')}</h1>
        <p className="emergency-contacts-subtitle">{t('Contacts for Emergency')}</p>

        {error && <div className="error-message">{error}</div>}

        <div className="contacts-section">
          <h2 className="section-title">{t('doctors')}</h2>
          <div className="contacts-grid">
            {doctors.map((doctor, index) => (
              <div key={index} className="contact-card">
                <div className="contact-info">
                  <h3>{doctor.name}</h3>
                  <p className="relationship">{doctor.specialty}</p>
                  <div className="contact-details">
                    <p><strong>{t('phone')}:</strong> {doctor.phone}</p>
                    <p><strong>{t('email')}:</strong> {doctor.email}</p>
                    <p><strong>{t('address')}:</strong> {doctor.address}</p>
                  </div>
                  <button 
                    className="call-button"
                    onClick={() => handleCall(doctor.phone)}
                  >
                    <FaPhone /> {t('call')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contacts-section">
          <h2 className="section-title">{t('family_members')}</h2>
          <div className="contacts-grid">
            {familyMembers.map((member, index) => (
              <div key={index} className="contact-card">
                <div className="contact-info">
                  <h3>{member.name}</h3>
                  <p className="relationship">{member.relationship}</p>
                  <div className="contact-details">
                    <p><strong>{t('phone')}:</strong> {member.phone}</p>
                    {member.email && <p><strong>{t('email')}:</strong> {member.email}</p>}
                    {member.address && <p><strong>{t('address')}:</strong> {member.address}</p>}
                  </div>
                  <button 
                    className="call-button"
                    onClick={() => handleCall(member.phone)}
                  >
                    <FaPhone /> {t('call')}
                  </button>
                </div>
              </div>
            ))}

            {familyMembers.length === 0 && (
              <div className="no-contacts">
                <p>{t('no_family_contacts')}</p>
                <p>{t('add_family_members_medical_form')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts; 