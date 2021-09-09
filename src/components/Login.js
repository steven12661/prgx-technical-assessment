import React, { useState, useEffect } from "react";
import { setUserSession } from '../Utils/Common';

import axios from 'axios'

function Login(props) {

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const history = useHistory();


  //  useEffect(() => {
  //    if(sessionStorage.getItem('user'))
  //    {
  //      props.history.push("/todo")
  //    }
  //  }, )

  // async function login() {
  //   let item = { email, password };
  //   console.log(item);
  //   let result = await fetch(
  //     "https://api-nodejs-todolist.herokuapp.com/user/login",
  //     {
  //       method: "POST",
  //       body: JSON.stringify(item),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   result = await result.json();
  //   sessionStorage.setItem("user", JSON.stringify(result))
  //   console.log("result: ", result);
  // }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const email = useFormInput('');
  const password = useFormInput('');
  
  const handleLogin = () => {

    setError(null);
    setLoading(true);
    axios.post('https://api-nodejs-todolist.herokuapp.com/user/login',{ email: email.value, password: password.value })
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
      Login<br /><br />
      <div>
        email<br />
        <input type="text" {...email} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
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