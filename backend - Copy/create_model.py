import json
import pickle

# Define the disease rules
DISEASE_RULES = {
    # Single symptoms
    'fever': 'Common Cold',
    'cough': 'Bronchitis',
    'sore_throat': 'Strep Throat',
    'headache': 'Migraine',
    'fatigue': 'Anemia',
    'nausea': 'Gastritis',
    'dizziness': 'Vertigo',
    'rash': 'Allergic Reaction',
    'muscle_pain': 'Fibromyalgia',
    'shortness_of_breath': 'Asthma',
    
    # Two symptoms
    'fever,cough': 'Flu',
    'fever,sore_throat': 'Tonsillitis',
    'fever,headache': 'Viral Infection',
    'fever,fatigue': 'Mononucleosis',
    'fever,rash': 'Measles',
    'cough,sore_throat': 'Bronchitis',
    'cough,headache': 'Sinus Infection',
    'cough,shortness_of_breath': 'Pneumonia',
    'sore_throat,headache': 'Sinusitis',
    'nausea,fatigue': 'Food Poisoning',
    'dizziness,nausea': 'Motion Sickness',
    'rash,itching': 'Contact Dermatitis',
    
    # Three symptoms
    'fever,cough,sore_throat': 'Common Cold',
    'fever,cough,headache': 'Influenza',
    'fever,sore_throat,headache': 'Tonsillitis',
    'fever,fatigue,headache': 'Viral Meningitis',
    'fever,rash,headache': 'Chickenpox',
    'cough,shortness_of_breath,fatigue': 'Chronic Bronchitis',
    'nausea,vomiting,fatigue': 'Gastroenteritis',
    'dizziness,nausea,headache': 'Migraine',
    'rash,itching,fever': 'Allergic Reaction',
    'muscle_pain,fatigue,headache': 'Fibromyalgia',
    
    # Four symptoms
    'fever,cough,sore_throat,headache': 'Severe Viral Infection',
    'fever,cough,shortness_of_breath,fatigue': 'Pneumonia',
    'fever,rash,headache,muscle_pain': 'Dengue Fever',
    'nausea,vomiting,fatigue,dizziness': 'Food Poisoning',
    'rash,itching,fever,headache': 'Allergic Reaction',
    
    # Five or more symptoms
    'fever,cough,sore_throat,headache,fatigue': 'Severe Viral Infection',
    'fever,cough,shortness_of_breath,fatigue,muscle_pain': 'Pneumonia',
    'fever,rash,headache,muscle_pain,nausea': 'Dengue Fever'
}

# Save the model
with open('disease_predictor.pkl', 'wb') as f:
    pickle.dump(DISEASE_RULES, f)

print("Model created and saved successfully!") 