import React, { useEffect, useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [currentUser, setCurrentUser] = useState();
    const [authToken, setAuthToken] = useState();

    useEffect(()=> {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        let obj = {
            email: email,
            password: password
        }

        axios.post('/api/v1/auth/login', obj)
        .then(response =>{
            setAuthToken(response.data.token);

            setCurrentUser(response.data.user);

            window.location.href = '/dashboard';

        })
        .catch(err => setErrorMessage(err.response.data.message));

        
    }

    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(currentUser));

  return (
    <>

      <div className="outer">
      <form onSubmit={handleSubmit}>
        <div className='form'>

          <div className='input-container ic1'>
              <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" className="input" type="text" placeholder=" " />
              <div className="cut"></div>
              <label for="email" className="placeholder">Email</label>
          </div>

          <div className="input-container ic2">
              <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" className="input" type="password" placeholder=" " />
              <div className="cut"></div>
              <label for="password" className="placeholder">Password</label>
          </div>
          <div className="form-danger">{errorMessage}</div>
            <button type="text" className="submit">Log In</button>
        
            <div className="su-link">
              Don't have an Account?<Link to={"./signup"}>
                Sign Up
              </Link>
            </div>
        </div>
        </form>
    </div>
    </>
  )
}

export default Login