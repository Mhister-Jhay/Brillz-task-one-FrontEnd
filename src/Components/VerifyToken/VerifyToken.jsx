import '../Registration/Registration.css'
import React, { useState } from 'react';
import axios from 'axios';

export default function VerifyToken(){
    const [showHeading, setShowHeading] = useState(false)
    const [showResponseHeading, setShowResponseHeading] = useState(false)
    const [showButton, setShowButton] = useState(true)
    const [verifyStatus, setVerifyStatus] = useState('')

    const handleOnClick = (e) => {
        e.preventDefault();

   

        const tokens = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        

        const headers = {
            'Content-Type': 'application/json',
            Authorization: tokens, // Replace with the actual token value
          };

        axios.get('http://localhost:8080/api/v1/user/validateToken',{
            headers,
            params: {
              username: username // Replace with the actual username value
            }
        })
        .then((response) => {
            const status = response.data.data;
            setVerifyStatus(status)
            setShowButton(false)
            setShowHeading(true)
            console.log(verifyStatus)

        })
        .catch((error) => {
            console.log(error)
        })
    }
   
    return(
        <>
        <div className="backgroundDiv">
        {showHeading && (
          <div className='heading'>
            <h1>{verifyStatus}</h1>
          </div>
        )}
        {showButton && (
          <div className='buttonDiv'>
            <button className='submit-button2' type="button" onClick={handleOnClick}>Verify</button>
          </div>
        )}
        </div>
        </>
    )
}