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
  <div className="flex justify-center items-center h-screen">
    <div className="grid place-items-center grid-cols-1 md:grid-cols-custom font-roboto text-3xl w-4/5 h-3/4 bg-white rounded-3xl shadow-[0_5px_20px_rgba(77,91,170,0.5)]">
      <div className="flex flex-col justify-center items-center text-center w-4/5 mx-auto">
        <div className="mb-12">
          <h2>{title}</h2>
          {title === 'Hello!' && (
            <p className="text-gray-600">Sign in to your account</p>
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
            <div className="text-base">
              <label htmlFor="agreeTerms" className="flex justify-center">
                <input type="checkbox" id="agreeTerms" name="agreeTerms" required />
                <p className="ml-4 text-blue-500 text-1xl">I read and agree to the Terms and Conditions</p>
              </label>
            </div>
          )}
          <div>
            <input type="submit" value={buttonText} />
          </div>
        </form>
        <p className="text-blue-500 text-2xl">{message}</p>
      </div>
      <div className="bg-gradient-to-r from-custom-red to-custom-pink flex flex-col justify-center items-center h-full text-white rounded-tr-2xl rounded-br-2xl text-center gap-8 p-20 lg:p-16 md:p-8 max-md:hidden">
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
