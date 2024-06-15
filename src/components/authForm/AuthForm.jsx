import React from 'react';
import PropTypes from 'prop-types';
import './authForm.css';
import { useDispatch } from 'react-redux';
import manager from '../../../public/Assets/manager.jpeg';
import dev from '../../../public/Assets/dev.jpeg';
import qa from '../../../public/Assets/qa.jpeg';
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
  handleFormSwitch,
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

  const handleMessageClick = () => {
    handleFormSwitch(formType === 'signin' ? 'signup' : 'signin');
  };

  const handleManagerClick = (email, password) => {
    dispatch(login({ email, password }));
  };

  const handleKeyPress = (e, email, password) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleManagerClick(email, password);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid place-items-center grid-cols-1 md:grid-cols-custom font-roboto text-3xl w-3/4 h-3/4 bg-white rounded-3xl shadow-[0_5px_20px_rgba(77,91,170,0.5)]">
        <div className="flex flex-col justify-center items-center text-center w-4/5 mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-semibold">{title}</h2>
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
                <label htmlFor="qa" className="terms-conditions-label flex justify-center gap-4">
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
            {formType === 'signin' && (
              <div>
                <p className="mb-5">Demo Users</p>
                <div className="flex justify-center gap-6 mb-7">
                  <div
                    role="button"
                    tabIndex="0"
                    onClick={() => handleManagerClick('manager@gmail.com', '123456')}
                    onKeyPress={(e) => handleKeyPress(e, 'manager@gmail.com', '123456')}
                    className="w-1/5"
                  >
                    <img
                      src={manager}
                      alt="admin"
                      className="rounded-full"
                    />
                    <p className="text-xl">Manager</p>
                  </div>
                  <div
                    role="button"
                    tabIndex="0"
                    onClick={() => handleManagerClick('developer@gmail.com', '123456')}
                    onKeyPress={(e) => handleKeyPress(e, 'developer@gmail.com', '123456')}
                    className="w-1/5"
                  >
                    <img
                      src={dev}
                      alt="dev"
                      className="rounded-full"
                    />
                    <p className="text-xl">Developer</p>
                  </div>
                  <div
                    role="button"
                    tabIndex="0"
                    onClick={() => handleManagerClick('qa@gmail.com', '123456')}
                    onKeyPress={(e) => handleKeyPress(e, 'qa@gmail.com', '123456')}
                    className="w-1/5"
                  >
                    <img
                      src={qa}
                      alt="qa"
                      className="rounded-full"
                    />
                    <p className="text-xl">QA</p>
                  </div>
                </div>
              </div>
            )}
          </form>
          <button
            type="button"
            className="text-blue-500 text-2xl cursor-pointer"
            onClick={handleMessageClick}
          >
            {message}
          </button>
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
  handleFormSwitch: PropTypes.func.isRequired,
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
