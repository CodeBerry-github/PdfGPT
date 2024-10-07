import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import '../styles/Login.css';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        userCredential.user.getIdToken().then((token) => {
          localStorage.setItem('token', token);
          navigate('/dashboard', { state: { userId } });
        });
      })
      .catch(() => {
        setError('Invalid user credentials');
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        updateProfile(userCredential.user, { displayName: name })
          .then(() => {
            userCredential.user.getIdToken().then((token) => {
              localStorage.setItem('token', token);
              navigate('/dashboard', { state: { userId } });
            });
          })
          .catch(() => {
            setError('Failed to set display name');
          });
      })
      .catch(() => {
        setError('Failed to create an account');
      });
  };

  return (
    <div className={`login-container ${isRegistering ? 'login-container-active' : ''}`} id="container">
      {/* Sign Up Form */}
      <div className="login-form-container login-sign-up">
        <form onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <div className="login-social-icons">
            <a href="#" className="login-icon" id="google-register">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="login-icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="login-icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="login-icon">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Name" 
            id="name-register" 
            className="login-input"
          />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            id="register-email" 
            className="login-input"
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            id="register-pass" 
            className="login-input"
          />
          <button type="submit" className="login-button" id="registerUser">Sign Up</button>
          {error && <div className="login-error"><p>{error}</p></div>}
        </form>
      </div>

      {/* Sign In Form */}
      <div className="login-form-container login-sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="login-social-icons">
            <a href="#" className="login-icon" id="google-login">
              <FontAwesomeIcon icon={faGooglePlusG} />
            </a>
            <a href="#" className="login-icon">
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="login-icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="#" className="login-icon">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </div>
          <span>or use your email password</span>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            id="sign-in-email" 
            className="login-input"
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            id="sign-in-pass" 
            className="login-input"
          />
          <a href="#">Forget Your Password?</a>
          <button type="submit" className="login-button" id="loginUser">Sign In</button>
          {error && <div className="login-error"><p>{error}</p></div>}
        </form>
      </div>

      {/* Toggle for Sign In/Sign Up */}
      <div className="login-toggle-container">
        <div className="login-toggle">
          <div className="login-toggle-panel login-toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all site features</p>
            <button className="login-hidden" id="showLogin" onClick={() => setIsRegistering(false)}>Sign In</button>
          </div>
          <div className="login-toggle-panel login-toggle-right">
            <h1>Hello, User!</h1>
            <p>Please Register with your personal details to use all site features</p>
            <button className="login-hidden" id="showRegister" onClick={() => setIsRegistering(true)}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
