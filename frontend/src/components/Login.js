import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    // Avoid page reloading
    event.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    if(json.success) {
      // Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert('success', 'Logged In Successfully!!');
    }
    else {
      props.showAlert('danger', 'Invalid Credentials!!');
    }
  }

  const onChange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value});
  }

  return (
    <div className='mt-3'>
      <h3>Login to continue to Stack Notes</h3>
      <form onSubmit={handleSubmit}>
        <div className="my-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange}/>
          <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" value={credentials.password} onChange={onChange}>Password</label>
          <input type="password" className="form-control" id="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
