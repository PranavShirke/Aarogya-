import sys
import json

# Comprehensive disease prediction rules with more symptoms
DISEASE_RULES = {
    # Single symptoms
    'fever': 'Common Cold',
    'cough': 'Bronchitis',
    'sore throat': 'Strep Throat',
    'headache': 'Migraine',
    'fatigue': 'Anemia',
    'nausea': 'Gastritis',
    'dizziness': 'Vertigo',
    'rash': 'Allergic Reaction',
    'muscle pain': 'Fibromyalgia',
    'breathing difficulty': 'Asthma',
    'chest pain': 'Angina',
    'joint pain': 'Arthritis',
    'abdominal pain': 'Gastritis',
    'blurred vision': 'Migraine',
    'insomnia': 'Anxiety',
    'loss of appetite': 'Gastritis',
    'weakness': 'Anemia',
    'chills': 'Common Cold',
    'sweating': 'Anxiety',
    
    # Two symptoms
    'fever,cough': 'Flu',
    'fever,sore throat': 'Tonsillitis',
    'fever,headache': 'Viral Infection',
    'fever,fatigue': 'Mononucleosis',
    'fever,rash': 'Measles',
    'cough,sore throat': 'Bronchitis',
    'cough,headache': 'Sinus Infection',
    'cough,breathing difficulty': 'Pneumonia',
    'sore throat,headache': 'Sinusitis',
    'nausea,fatigue': 'Food Poisoning',
    'dizziness,nausea': 'Motion Sickness',
    'rash,itching': 'Contact Dermatitis',
    'chest pain,breathing difficulty': 'Heart Condition',
    'joint pain,fatigue': 'Rheumatoid Arthritis',
    'abdominal pain,nausea': 'Gastritis',
    'blurred vision,headache': 'Migraine',
    'insomnia,fatigue': 'Anxiety',
    'loss of appetite,nausea': 'Gastritis',
    'weakness,fatigue': 'Anemia',
    'chills,fever': 'Flu',
    'sweating,anxiety': 'Anxiety',
    
    # Three symptoms
    'fever,cough,sore throat': 'Common Cold',
    'fever,cough,headache': 'Influenza',
    'fever,sore throat,headache': 'Tonsillitis',
    'fever,fatigue,headache': 'Viral Meningitis',
    'fever,rash,headache': 'Chickenpox',
    'cough,breathing difficulty,fatigue': 'Chronic Bronchitis',
    'nausea,vomiting,fatigue': 'Gastroenteritis',
    'dizziness,nausea,headache': 'Migraine',
    'rash,itching,fever': 'Allergic Reaction',
    'muscle pain,fatigue,headache': 'Fibromyalgia',
    'chest pain,breathing difficulty,fatigue': 'Heart Condition',
    'joint pain,fatigue,muscle pain': 'Rheumatoid Arthritis',
    'abdominal pain,nausea,vomiting': 'Gastroenteritis',
    'blurred vision,headache,nausea': 'Migraine',
    'insomnia,fatigue,headache': 'Anxiety',
    'loss of appetite,nausea,fatigue': 'Gastritis',
    'weakness,fatigue,dizziness': 'Anemia',
    'chills,fever,headache': 'Flu',
    'sweating,anxiety,insomnia': 'Anxiety',
    
    # Four symptoms
    'fever,cough,sore throat,headache': 'Severe Viral Infection',
    'fever,cough,breathing difficulty,fatigue': 'Pneumonia',
    'fever,rash,headache,muscle pain': 'Dengue Fever',
    'nausea,vomiting,fatigue,dizziness': 'Food Poisoning',
    'rash,itching,fever,headache': 'Allergic Reaction',
    'chest pain,breathing difficulty,fatigue,dizziness': 'Heart Condition',
    'joint pain,fatigue,muscle pain,insomnia': 'Rheumatoid Arthritis',
    'abdominal pain,nausea,vomiting,fatigue': 'Gastroenteritis',
    'blurred vision,headache,nausea,dizziness': 'Migraine',
    'insomnia,fatigue,headache,muscle pain': 'Anxiety',
    'loss of appetite,nausea,fatigue,weakness': 'Gastritis',
    'weakness,fatigue,dizziness,headache': 'Anemia',
    'chills,fever,headache,muscle pain': 'Flu',
    'sweating,anxiety,insomnia,headache': 'Anxiety',
    
    # Five or more symptoms
    'fever,cough,sore throat,headache,fatigue': 'Severe Viral Infection',
    'fever,cough,breathing difficulty,fatigue,muscle pain': 'Pneumonia',
    'fever,rash,headache,muscle pain,nausea': 'Dengue Fever',
    'chest pain,breathing difficulty,fatigue,dizziness,nausea': 'Heart Condition',
    'joint pain,fatigue,muscle pain,insomnia,headache': 'Rheumatoid Arthritis',
    'abdominal pain,nausea,vomiting,fatigue,dizziness': 'Gastroenteritis',
    'blurred vision,headache,nausea,dizziness,fatigue': 'Migraine',
    'insomnia,fatigue,headache,muscle pain,anxiety': 'Anxiety',
    'loss of appetite,nausea,fatigue,weakness,dizziness': 'Gastritis',
    'weakness,fatigue,dizziness,headache,insomnia': 'Anemia',
    'chills,fever,headache,muscle pain,fatigue': 'Flu',
    'sweating,anxiety,insomnia,headache,fatigue': 'Anxiety'
}

# Additional symptom combinations with probabilities
SYMPTOM_PROBABILITIES = {
    'fever': {
        'Common Cold': 0.6,
        'Flu': 0.2,
        'Viral Infection': 0.2
    },
    'cough': {
        'Bronchitis': 0.5,
        'Flu': 0.3,
        'COVID-19': 0.2
    },
    'sore throat': {
        'Strep Throat': 0.4,
        'Tonsillitis': 0.3,
        'Viral Infection': 0.3
    },
    'headache': {
        'Migraine': 0.4,
        'Sinusitis': 0.3,
        'Viral Infection': 0.3
    },
    'fatigue': {
        'Anemia': 0.4,
        'Viral Infection': 0.3,
        'Chronic Fatigue': 0.3
    },
    'nausea': {
        'Gastritis': 0.4,
        'Food Poisoning': 0.3,
        'Viral Infection': 0.3
    },
    'dizziness': {
        'Vertigo': 0.5,
        'Migraine': 0.3,
        'Anemia': 0.2
    },
    'rash': {
        'Allergic Reaction': 0.5,
        'Contact Dermatitis': 0.3,
        'Viral Infection': 0.2
    },
    'muscle pain': {
        'Fibromyalgia': 0.4,
        'Viral Infection': 0.3,
        'Flu': 0.3
    },
    'breathing difficulty': {
        'Asthma': 0.5,
        'Bronchitis': 0.3,
        'Pneumonia': 0.2
    },
    'chest pain': {
        'Angina': 0.5,
        'Heart Condition': 0.3,
        'Anxiety': 0.2
    },
    'joint pain': {
        'Arthritis': 0.5,
        'Rheumatoid Arthritis': 0.3,
        'Viral Infection': 0.2
    },
    'abdominal pain': {
        'Gastritis': 0.5,
        'Gastroenteritis': 0.3,
        'Food Poisoning': 0.2
    },
    'blurred vision': {
        'Migraine': 0.5,
        'Eye Strain': 0.3,
        'Anxiety': 0.2
    },
    'insomnia': {
        'Anxiety': 0.5,
        'Stress': 0.3,
        'Depression': 0.2
    },
    'loss of appetite': {
        'Gastritis': 0.5,
        'Anxiety': 0.3,
        'Viral Infection': 0.2
    },
    'weakness': {
        'Anemia': 0.5,
        'Viral Infection': 0.3,
        'Chronic Fatigue': 0.2
    },
    'chills': {
        'Common Cold': 0.5,
        'Flu': 0.3,
        'Viral Infection': 0.2
    },
    'sweating': {
        'Anxiety': 0.5,
        'Viral Infection': 0.3,
        'Heart Condition': 0.2
    }
}

def predict_disease(symptoms):
    if not symptoms:  # If no symptoms are selected
        return "Please select at least one symptom"
        
    # Sort symptoms to ensure consistent key lookup
    symptoms_key = ','.join(sorted(symptoms))
    
    # Try to find exact match first
    if symptoms_key in DISEASE_RULES:
        return DISEASE_RULES[symptoms_key]
    
    # If no exact match, try to find the closest match
    # This handles cases where we have a subset of symptoms
    for key in DISEASE_RULES:
        key_symptoms = set(key.split(','))
        if all(symptom in key_symptoms for symptom in symptoms):
            return DISEASE_RULES[key]
    
    # If still no match, use probability-based prediction
    if len(symptoms) == 1:
        symptom = symptoms[0]
        if symptom in SYMPTOM_PROBABILITIES:
            # Get the most probable disease for the single symptom
            return max(SYMPTOM_PROBABILITIES[symptom].items(), key=lambda x: x[1])[0]
    
    return "Unknown combination of symptoms"

if __name__ == "__main__":
    try:
        input_json = sys.argv[1]
        input_data = json.loads(input_json)
        symptoms = input_data['symptoms']
        
        prediction = predict_disease(symptoms)
        print(prediction)
    except Exception as e:
        print(f"Error processing input: {str(e)}", file=sys.stderr)
        sys.exit(1)
