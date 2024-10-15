import React, { useState } from 'react';
import './Home.module.css';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState(''); 
  const navigate = useNavigate();

  
  const users = [
    { email: 'user@example.com', password: 'password123' },
    { email: 'admin@example.com', password: 'admin123' },
  ];

  
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

 
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleClick = (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setLoginError('');
    let isValid = true;
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    }
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    if (isValid) {
      const user = users.find((user) => user.email === email && user.password === password);
      if (user) {
        navigate('/Dashboard');
      } else {
        setLoginError('Invalid email or password. Please try again.');
      }
    }
  };

  return (
    <>
    <div className="home-container">
      <form className='form-home'>
        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type="email"
            id='email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type="password"
            id='password'
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
        </div>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <button onClick={handleClick}>Login</button>
      </form>
      </div>
    </>
  );
}
