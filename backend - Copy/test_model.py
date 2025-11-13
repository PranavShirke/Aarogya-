import joblib
import os

try:
    # Get the absolute path to the model file
    current_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(current_dir, 'disease_predictor.pkl')
    
    print(f"Looking for model at: {model_path}")
    print(f"File exists: {os.path.exists(model_path)}")
    
    # Try to load the model
    model = joblib.load(model_path)
    print("Model loaded successfully!")
    
    # Test prediction
    test_input = [1, 0, 0, 0]  # Just fever
    prediction = model.predict([test_input])
    print(f"Test prediction result: {prediction[0]}")
    
except Exception as e:
    print(f"Error: {str(e)}") 