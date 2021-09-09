import React, { useState } from "react";
import { setUserSession } from '../Utils/Common';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Link,
  
} from "react-router-dom";
function Login(props) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const email = useFormInput('');
  const password = useFormInput('');

  const handleLogin = () => {

    setError(null);
    setLoading(true);
    axios.post('https://api-nodejs-todolist.herokuapp.com/user/login', { email: email.value, password: password.value })
      .then(response => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push('/todo');
      }).catch(error => {
        setLoading(false);
        if (error.response.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  }

  return (
    <div>

      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" {...email} autoComplete="new-password" placeholder="Enter email" />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password"{...password} autoComplete="new-password" placeholder="Password" />
        </Form.Group>
        <Button variant="success" tvalue={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading}>Login</Button>{" "}
        <Link to="/signup">
        <Button variant="success">Sign up</Button>
</Link>
      </Form>
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;