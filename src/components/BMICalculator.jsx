import React, { useState } from 'react';
import './BMICalculator.css';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setCategory('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 25) {
        setCategory('Normal weight');
      } else if (bmiValue >= 25 && bmiValue < 30) {
        setCategory('Overweight');
      } else {
        setCategory('Obese');
      }
    }
  };

  return (
    <div className="bmi-container">
      <div className="bmi-card">
        <h2>BMI Calculator</h2>
        
        <form className="bmi-form" onSubmit={calculateBMI}>
          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight"
              required
            />
          </div>

          <button type="submit" className="calculate-btn">
            Calculate BMI
          </button>
        </form>

        {bmi && (
          <div className="result-section">
            <h3>Your Results</h3>
            <div className="bmi-result">
              <p>Your BMI is: <span className="bmi-value">{bmi}</span></p>
              <p>You are: <span className="bmi-category">{category}</span></p>
            </div>

            <div className="bmi-scale">
              <div className="scale-item underweight">
                <p>Underweight</p>
                <small>&lt; 18.5</small>
              </div>
              <div className="scale-item normal">
                <p>Normal</p>
                <small>18.5 - 24.9</small>
              </div>
              <div className="scale-item overweight">
                <p>Overweight</p>
                <small>25 - 29.9</small>
              </div>
              <div className="scale-item obese">
                <p>Obese</p>
                <small>≥ 30</small>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator; 