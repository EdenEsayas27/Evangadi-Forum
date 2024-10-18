import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';
import './register.css';

const Register = ({ onClick, className }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const usernameDom = useRef();
  const firstnameDom = useRef();
  const lastnameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();

    const usernameValue = usernameDom.current.value;
    const firstValue = firstnameDom.current.value;
    const lastValue = lastnameDom.current.value;
    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!usernameValue || !firstValue || !lastValue || !emailValue || !passValue) {
      setError('Please provide all required fields!');
      return;
    }

    try {
      await axios.post('/users/register', {
        username: usernameValue,
        first_name: firstValue,
        last_name: lastValue,
        email: emailValue,
        password: passValue,
      });

      setSuccess('Registered successfully.');
  
    } catch (error) {
      setError('Something went wrong!');
    }
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <section className={`register px-5 py-2 ${className}`}>
      <div className="register_container text-center">
        <h2>Join the network</h2>
        {success && (
          <p style={{ textAlign: 'center', color: 'green', marginBottom: '13px' }}>
            {success}
          </p>
        )}
        {error && (
          <p style={{ textAlign: 'center', color: 'red', marginBottom: '13px' }}>
            {error}
          </p>
        )}

        <div className="mt-3">
          <span>Already have an account?</span>
          <span className="login cursor--pointer text-warning ms-2" onClick={onClick}>
            Sign in
          </span>
        </div>
        <form onSubmit={handleSubmit} className="registration__form">
          <input
            ref={usernameDom}
            type="text"
            placeholder="Username"
            className="form-control fs-3 p-3 mt-5"
          />

          <input
            ref={emailDom}
            type="email"
            placeholder="Email Address"
            className="form-control fs-3 p-3 mt-3"
          />

          <div className="register_first_last d-flex gap-2 mt-3">
            <div className="col-6">
              <input
                ref={firstnameDom}
                type="text"
                placeholder="First name"
                className="form-control fs-3 p-3"
              />
            </div>

            <div className="col-6">
              <input
                ref={lastnameDom}
                type="text"
                placeholder="Last name"
                className="form-control fs-3 p-3"
              />
            </div>
          </div>

          <div className="input-group">
            <input
              ref={passwordDom}
              type={`${showPass ? 'text' : 'password'}`}
              placeholder="Password"
              className="form-control fs-3 p-3 mt-3"
            />
            <span
              className="position-absolute show--pass me-2 cursor--pointer"
              onClick={handleShowPass}
            >
              {showPass ? (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
                </svg>
              ) : (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 1024 1024"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 0 0 0-51.5zm-63.57-320.64L836 122.88a8 8 0 0 0-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 0 0 0 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 0 0 0 11.31L155.17 889a8 8 0 0 0 11.31 0l712.15-712.12a8 8 0 0 0 0-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 0 0-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 0 1 146.2-106.69L401.31 546.2A112 112 0 0 1 396 512z"></path>
                  <path d="M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 0 0 227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 0 1-112 112z"></path>
                </svg>
              )}
            </span>
          </div>
          <button className="btn btn-primary w-100 fs-3 mt-5 p-3" type="submit" onClick={onClick}>
            Register
          </button>
        </form>
        <span className="login cursor--pointer mt-5 text-warning" onClick={onClick}>
          Already have an account
        </span>
      </div>
    </section>
  );
};

export default Register;
