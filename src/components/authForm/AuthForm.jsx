import React from 'react';
import PropTypes from 'prop-types';
import './authForm.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/AuthSlice';

const AuthForm = ({
  title = '',
  buttonText = '',
  message = '',
  inputFields = [],
  showCheckbox = false,
  welcomeMsg = '',
  welcomeDetail = '',
  formType = 'signin',
  handleSubmit,
  setFieldValue,
  userType,
}) => {
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formType === 'signin') {
      const credentials = inputFields.reduce((acc, field) => {
        acc[field.name] = field.value;
        return acc;
      }, {});
      dispatch(login(credentials));
    } else {
      handleSubmit();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid place-items-center grid-cols-1 md:grid-cols-custom font-roboto text-3xl w-3/4 h-3/4 bg-white rounded-3xl shadow-[0_5px_20px_rgba(77,91,170,0.5)]">
        <div className="flex flex-col justify-center items-center text-center w-4/5 mx-auto">
          <div className="mb-12">
            <h2>{title}</h2>
            {title === 'Hello!' && (
              <p className="text-gray-600">Sign in to your account</p>
            )}
          </div>
          <form className="auth-form" onSubmit={handleFormSubmit}>
            {inputFields.map((field) => (
              <div key={field.name} className="input-with-icon">
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  required
                />
                <i className={field.iconClass} />
              </div>
            ))}
            {showCheckbox && (
              <div className="checkbox-container">
                <label htmlFor="qa" className="terms-conditions-label">
                  <input
                    type="checkbox"
                    id="qa"
                    name="user_type"
                    checked={userType === 'qa'}
                    onChange={() => setFieldValue(
                      'user_type',
                      userType === 'qa' ? 'developer' : 'qa',
                    )}
                  />
                  <p className="term">Are you QA?</p>
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
};

AuthForm.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  inputFields: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    iconClass: PropTypes.string.isRequired,
  })).isRequired,
  showCheckbox: PropTypes.bool,
  welcomeMsg: PropTypes.string,
  welcomeDetail: PropTypes.string,
  formType: PropTypes.string,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func.isRequired,
  userType: PropTypes.oneOf(['qa', 'developer']),
};

AuthForm.defaultProps = {
  showCheckbox: false,
  welcomeMsg: '',
  welcomeDetail: '',
  formType: 'signin',
  handleSubmit: () => {},
  userType: 'developer',
};

export default AuthForm;
