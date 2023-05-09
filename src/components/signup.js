import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import axios from 'axios';
import Popup from "reactjs-popup";

export const SignUp = () => {

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      dateOfBirth: dateOfBirth,
      gender: gender,
      password: password
    }
    
    axios.post('/api/v1/auth/signup', obj)
    .then(response =>{
        console.log(response);
        setShow(true);
    })
    .catch(err => setErrorMessage(err.response.data.message));
  };

  return (
    <>
     
     <div class="outer sign">
            <form onSubmit={handleSubmit}>
            <div className='form signUp'>
              <div className='input-container ic1'>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)}
                     id="firstname" className="input" type="text" placeholder=" " required/>
                  <div className="cut"></div>
                  <label for="firstname" className="placeholder">First Name<span class="required-mark">*</span></label>
              </div>
    
              <div class="input-container ic2">
                  <input value={middleName} onChange={(e) => setMiddleName(e.target.value)}
                     id="middlename" className="input" type="text" placeholder=" " />
                  <div className="cut"></div>
                  <label for="middlename" className="placeholder">Middle Name</label>
              </div>

              <div class="input-container ic2">
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)}
                     id="lastname" className="input" type="text" placeholder=" " required />
                  <div className="cut"></div>
                  <label for="lastname" className="placeholder">Last Name<span class="required-mark">*</span></label>
              </div>

              <div class="input-container ic2">
                  <input value={email} onChange={(e) => setEmail(e.target.value)}
                     id="email" className="input" type="text" placeholder=" " required />
                  <div className="cut"></div>
                  <label for="email" className="placeholder">Email<span class="required-mark">*</span></label>
              </div>

              <div class="input-container ic2">
                  <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}
                     id="phone" className="input" type="text" placeholder=" " pattern="[1-9]{1}[0-9]{9}"
                     required />
                  <div className="cut"></div>
                  <label for="phone" className="placeholder">Phone Number<span class="required-mark">*</span></label>
              </div>

              <div class="input-container ic2">
                  <input value={address} onChange={(e) => setAddress(e.target.value)}
                     id="address" className="input" type="text" placeholder=" " required/>
                  <div className="cut"></div>
                  <label for="adress" className="placeholder">Address<span class="required-mark">*</span></label>
              </div>

              <div class="input-container ic2">
                  <input  value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}
                     id="birth" className="input" type="date" placeholder=" " required/>
                  <div className="cut"></div>
                  <label for="birth" className="placeholder">Date Of Birth<span class="required-mark">*</span></label>
              </div>


              <div class="input-container ic2">
                  <div><p>Gender<span class="required-mark">*</span> :</p></div>                  
                    <label htmlFor="male" class="container">Male
                        <input value="MALE" onChange={(e) => setGender(e.target.value)} type="radio" id="male" placeholder=" " name="radio" checked={gender === "MALE"} required/>
                        <span class="checkmark"></span>
                    </label>
                    <label htmlFor="female" class="container">Female
                        <input  value="FEMALE" onChange={(e) => setGender(e.target.value)} type="radio" id="female" placeholder=" " name="radio" checked={gender === "FEMALE"} required/>
                        <span class="checkmark"></span>
                    </label>
              </div>


              <div class="input-container ic2">
                  <input value={password} onChange={(e) => setPassword(e.target.value)} 
                  id="password" className="input" type="password" placeholder=" " required/>
                  <div className="cut"></div>
                  <label for="password" className="placeholder">Password<span class="required-mark">*</span></label>
              </div>
              <div class="btn-wrap">

              <div className="form-danger">{errorMessage}</div>
              <div className="link">    
          Already have an account? <Link to="/">Login</Link></div>                 
          </div>
                
                <button type="submit" className="btn">Sign Up</button>

                <Popup open={show} closeOnDocumentClick onClose={closeModal}>
          <div className="modal">
            <div className="modal-text">Your account has been created successfully. Please click <Link className="login-redirect" to="/">continue</Link> to log in to your account.</div>
          </div>
        </Popup>
         
            </div>
            </form>
        </div>

       
        </>
  );
}

export default SignUp
