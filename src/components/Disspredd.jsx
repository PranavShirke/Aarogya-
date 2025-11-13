import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './dispred.css';

const DisPred = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [prediction, setPrediction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const { t } = useTranslation();
  const [isSeriousDisease, setIsSeriousDisease] = useState(false);

  useEffect(() => {
    const fetchContacts = async () => {
      const user = auth.currentUser;
      if (user) {
        // Fetch family members
        const familyQuery = query(
          collection(db, "medicalForms"),
          where("userId", "==", user.uid)
        );
        const familySnapshot = await getDocs(familyQuery);
        const members = [];
        familySnapshot.forEach(doc => {
          const data = doc.data();
          if (data.familyMembers) {
            members.push(...data.familyMembers);
          }
        });
        setFamilyMembers(members);

        // Fetch doctors (you can add your own logic to fetch doctors)
        setDoctors([
          { name: 'Dr. Smith', phone: '+1234567890', specialty: 'General Physician' },
          { name: 'Dr. Johnson', phone: '+0987654321', specialty: 'Emergency Care' }
        ]);
      }
    };

    fetchContacts();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSymptoms(prev => [...prev, value]);
    } else {
      setSymptoms(prev => prev.filter(symptom => symptom !== value));
    }
  };

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handlePredict = async () => {
    if (symptoms.length === 0) {
      setPrediction(t('select_symptoms_error'));
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await axios.post('https://aarogyabackend.onrender.com/predict', { symptoms });
      setPrediction(response.data.disease);
      setIsSeriousDisease(response.data.serious);
    } catch (error) {
      console.error("Prediction error:", error);
      setPrediction(t('prediction_error'));
      setIsSeriousDisease(false);
    } finally {
      setIsLoading(false);
    }
  };

  const symptomOptions = [
    { value: "fever", label: t('symptoms.fever'), description: t('symptom_descriptions.fever') },
    { value: "cough", label: t('symptoms.cough'), description: t('symptom_descriptions.cough') },
    { value: "sore throat", label: t('symptoms.sore_throat'), description: t('symptom_descriptions.sore_throat') },
    { value: "headache", label: t('symptoms.headache'), description: t('symptom_descriptions.headache') },
    { value: "body pain", label: t('symptoms.body_pain'), description: t('symptom_descriptions.body_pain') },
    { value: "fatigue", label: t('symptoms.fatigue'), description: t('symptom_descriptions.fatigue') },
    { value: "breathing difficulty", label: t('symptoms.breathing_difficulty'), description: t('symptom_descriptions.breathing_difficulty') },
    { value: "chest pain", label: t('symptoms.chest_pain'), description: t('symptom_descriptions.chest_pain') },
    { value: "nausea", label: t('symptoms.nausea'), description: t('symptom_descriptions.nausea') },
    { value: "vomiting", label: t('symptoms.vomiting'), description: t('symptom_descriptions.vomiting') },
    { value: "diarrhea", label: t('symptoms.diarrhea'), description: t('symptom_descriptions.diarrhea') },
    { value: "loss of taste", label: t('symptoms.loss_of_taste'), description: t('symptom_descriptions.loss_of_taste') },
    { value: "loss of smell", label: t('symptoms.loss_of_smell'), description: t('symptom_descriptions.loss_of_smell') },
    { value: "runny nose", label: t('symptoms.runny_nose'), description: t('symptom_descriptions.runny_nose') },
    { value: "congestion", label: t('symptoms.congestion'), description: t('symptom_descriptions.congestion') },
    { value: "muscle pain", label: t('symptoms.muscle_pain'), description: t('symptom_descriptions.muscle_pain') },
    { value: "joint pain", label: t('symptoms.joint_pain'), description: t('symptom_descriptions.joint_pain') },
    { value: "rash", label: t('symptoms.rash'), description: t('symptom_descriptions.rash') },
    { value: "loss of appetite", label: t('symptoms.loss_of_appetite'), description: t('symptom_descriptions.loss_of_appetite') },
    { value: "weakness", label: t('symptoms.weakness'), description: t('symptom_descriptions.weakness') },
    { value: "dizziness", label: t('symptoms.dizziness'), description: t('symptom_descriptions.dizziness') },
    { value: "chills", label: t('symptoms.chills'), description: t('symptom_descriptions.chills') },
    { value: "sweating", label: t('symptoms.sweating'), description: t('symptom_descriptions.sweating') },
    { value: "abdominal pain", label: t('symptoms.abdominal_pain'), description: t('symptom_descriptions.abdominal_pain') },
    { value: "blurred vision", label: t('symptoms.blurred_vision'), description: t('symptom_descriptions.blurred_vision') }
  ];

  return (
    <div className="dispred-container">
      <LanguageSelector />
      <div className="dispred-header">
        <Link to="/dashboard" className="back-link">
          ← {t('back_to_dashboard')}
        </Link>
        <h1>{t('disease_predictor')}</h1>
        <p className="subtitle">{t('select_symptoms')}</p>
      </div>
      
      <div className="symptoms-container">
        {symptomOptions.map(({ value, label, description }) => (
          <label key={value} className="symptom-label">
            <input
              type="checkbox"
              value={value}
              checked={symptoms.includes(value)}
              onChange={handleCheckboxChange}
              aria-label={`Select ${label}`}
            />
            <div className="symptom-info">
              <span className="symptom-name">{label}</span>
              <span className="symptom-description">{description}</span>
            </div>
          </label>
        ))}
      </div>

      <button 
        onClick={handlePredict}
        className={`predict-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? t('predicting') : t('predict')}
      </button>

      {prediction && (
        <div className="prediction-container">
          <h2>{t('prediction_result')}</h2>
          <div className="prediction-result">
            <h3>{prediction}</h3>
            <p className="disease-description">
              {t(`disease_descriptions.${prediction}`)}
            </p>
            {isSeriousDisease && (
              <div className="emergency-contacts">
                <h4>{t('emergency_contacts')}</h4>
                <p className="serious-warning">{t('serious_condition_warning')}</p>
                <div className="contact-buttons">
                  {familyMembers.map((member, index) => (
                    <button
                      key={index}
                      className="contact-button"
                      onClick={() => handleCall(member.phone)}
                    >
                      {t('call_family_member', { name: member.name })}
                    </button>
                  ))}
                  {doctors.map((doctor, index) => (
                    <button
                      key={`doctor-${index}`}
                      className="contact-button doctor"
                      onClick={() => handleCall(doctor.phone)}
                    >
                      {t('call_doctor', { name: doctor.name })}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div className="disclaimer">
              <p className="disclaimer-text">{t('prediction_disclaimer')}</p>
              <p className="consult-doctor">{t('consult_doctor')}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisPred;
