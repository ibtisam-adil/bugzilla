import React from 'react';
import PropTypes from 'prop-types';
import './authForm.css';

const AuthForm = ({
  title = '',
  buttonText = '',
  message = '',
  inputFields = [],
  showCheckbox = false,
  welcomeMsg = '',
  welcomeDetail = '',
}) => (
  <div className="main">
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>{title}</h2>
          {title === 'Hello!' && (
            <p className="signin-desc">Sign in to your account</p>
          )}
        </div>
        <form className="auth-form" action="/login" method="post">
          {inputFields.map((field) => (
            <div key={field.type} className="input-with-icon">
              <input type={field.type} name={field.name} placeholder={field.placeholder} required />
              <i className={field.iconClass} />
            </div>
          ))}
          {showCheckbox && (
            <div className="checkbox-container">
              <label htmlFor="agreeTerms" className="terms-conditions-label">
                <input type="checkbox" id="agreeTerms" name="agreeTerms" required />
                <p className="term">I read and agree to the Terms and Conditions</p>
              </label>
            </div>
          )}
          <div className="signin-button-container">
            <input type="submit" value={buttonText} />
          </div>
        </form>
        <p className="auth-message">{message}</p>
      </div>
      <div className="welcomeback-section">
        <h3>{welcomeMsg}</h3>
        <p>{welcomeDetail}</p>
      </div>
    </div>
  </div>
);

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  inputFields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    iconClass: PropTypes.string.isRequired,
  })).isRequired,
  showCheckbox: PropTypes.bool,
  welcomeMsg: PropTypes.string,
  welcomeDetail: PropTypes.string,
};

AuthForm.defaultProps = {
  showCheckbox: false,
  welcomeMsg: '',
  welcomeDetail: '',
};

export default AuthForm;
