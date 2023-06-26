import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Registration.css';
import axios from 'axios';

export default function Registration() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPassWordError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');
  const [emailError, setEmailError] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission or validation logic here
    // You can access the form values using the state variables (username, email, password, dateOfBirth)
    const registrationRequest = {
      username,
      email,
      password,
      dateOfBirth
    };
    
  
    axios
      .post('http://localhost:8080/api/v1/user/validateInputs', registrationRequest)
      .then((response) => {
        console.log(response.data.data);
        localStorage.setItem("token",response.data.data.accessToken)
        localStorage.setItem('username', response.data.data.username);


        

      
  
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== '') {
          console.log(localStorage.getItem('token'));
               
          console.log(localStorage.getItem('username'));

          window.location.replace('/verify-token'); // Redirect only if token exists
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const { password, dateOfBirth, username, email } = error.response.data;
          setPassWordError(password || '');
          setDateOfBirthError(dateOfBirth || '');
          setUsernameError(username || '');
          setEmailError(email || '');
        } else {
          console.log('Error occurred:', error);
        }
      });
    
      
      
      
      
      
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="backgroundDiv">
        <div className='heading'>
          <h1>Registration</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          <div className='error'>
              {(usernameError!=null) ? usernameError :""}
            </div>
            <div className='form-props'>
            <label className='form-label'>Username:</label>
            <input
              type="text"
              className='form-input'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            </div>
          </div>
          <div className="form-group">
          <div className='error'>
              {(emailError!=null) ? emailError :""}
            </div>
            <div className='form-props'>
            <label className='form-label'>Email:</label>
            <input
              type="text"
              className='form-input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
          </div>
          
          <div className="form-group">
          <div className='error'>
              {(passwordError!=null) ? passwordError :""}
            </div>
            <div className='form-props'>
            <label className='form-label'>Password:</label>
            <div className='password-input'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='form-input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                
              />
            </div>
            
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className='password-icon'
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div className="form-group">
          <div className='error'>
              {(dateOfBirthError!=null) ? dateOfBirthError :""}
            </div>
            <div className='form-props'>
            <label className='form-label'>Date of Birth:</label>
            <input
              type="date"
              className='form-input'
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
            </div>
          </div>
          <div className='buttonDiv'>
            <button className='submit-button' type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
