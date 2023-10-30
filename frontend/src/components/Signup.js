import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""}) ;
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
      event.preventDefault();
      const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
      });
      const json = await response.json()
      if (json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authToken); 
          navigate("/");
          props.showAlert('success', 'Account Created Successfully!!');
      }
      else{
        props.showAlert('danger', 'Invalid Credentials!!');
      }
  }

  const onChange = (event)=>{
      setCredentials({...credentials, [event.target.name]: event.target.value})
  }

  return (
      <div className='mt-3'>
        <h3>Create an account to use Stack Notes</h3>
          <form onSubmit={handleSubmit}>
              <div className="my-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" />
              </div>
              <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
              </div>
              <div className="mb-3">
                  <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
      </div>
  )
}

export default Signup
