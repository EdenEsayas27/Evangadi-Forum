import { useEffect, useRef, useState } from 'react';
import About from '../../components/About/About';
import LayOut from '../../components/LayOut/LayOut';
import Loading from '../../components/Loading/Loading';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './auth.css';

function Auth() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // State to manage the current view
  const formWrapperRef = useRef(null); // Ref to access the height of the container
  const loginRef = useRef(null);
  const registerRef = useRef(null);

  // Adjust height based on active form
  useEffect(() => {
    const currentHeight = isLogin
      ? loginRef.current.offsetHeight + 10
      : registerRef.current.offsetHeight + 10;
    formWrapperRef.current.style.height = `${currentHeight}px`;
  }, [isLogin]);

  const toggleForm = () => {
    setIsLogin(prev => !prev); // Toggle between login and register
  };

  if (isLoading) return <Loading />;

  return (
    <LayOut>
      <div className="bg d-flex justify-content-center align-items-center">
        <section className="container d-flex gap-5 flex-column flex-md-row">
          <div className="shadow-lg col-12 col-md-6 bg-light rounded auth-wrapper">
            <div className="form-wrapper" ref={formWrapperRef}>
              <div
                className={`form login-form ${
                  isLogin ? 'slide-in' : 'slide-out'
                }`}
                ref={loginRef}
              >
                <Login key="login" onClick={toggleForm} />
              </div>
              <div
                className={`form register-form ${
                  !isLogin ? 'slide-in' : 'slide-out'
                }`}
                ref={registerRef}
              >
                <Register key="register" onClick={toggleForm} />
              </div>
            </div>
          </div>
          <About className="col-12 col-md-6" />
        </section>
      </div>
    </LayOut>
  );
}

export default Auth;
