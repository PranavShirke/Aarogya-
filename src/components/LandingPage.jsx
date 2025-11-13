import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaHeartbeat, FaChartLine, FaRobot } from 'react-icons/fa';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span>AA</span>ROGYA</h1>
          <p className="hero-subtitle">Your Personal Health Companion</p>
          <div className="cta-buttons">
            <Link to="/login" className="cta-button primary">Get Started</Link>
            <Link to="/login" className="cta-button secondary">Sign In</Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose AAROGYA?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaUserMd className="feature-icon" />
            <h3>Medical History</h3>
            <p>Keep track of your medical records and history in one secure place</p>
          </div>
          <div className="feature-card">
            <FaHeartbeat className="feature-icon" />
            <h3>Health Monitoring</h3>
            <p>Monitor your vital health metrics and track your wellness journey</p>
          </div>
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Analytics</h3>
            <p>Get insights into your health patterns and progress</p>
          </div>
          <div className="feature-card">
            <FaRobot className="feature-icon" />
            <h3>AI Assistant</h3>
            <p>Get instant health advice and support from our AI assistant</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>About AAROGYA</h2>
          <p>
            AAROGYA is your comprehensive health management platform that helps you take control of your well-being.
            With advanced features and AI-powered assistance, we make healthcare management simple and accessible.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>Made with ❤️ by Team AAROGYA Under Guidance of Nawal Ma'am</p>
      </footer>
    </div>
  );
};

export default LandingPage; 