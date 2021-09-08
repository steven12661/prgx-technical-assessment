import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
// import "./Login.css";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();


  //  useEffect(() => {
  //    if(localStorage.getItem('user-info'))
  //    {
  //      history.push("/todo")
  //    }
  //  }, )


  async function login() {
    let item = { email, password };
    console.log(item);
    let result = await fetch(
      "https://api-nodejs-todolist.herokuapp.com/user/login",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    result = await result.json();
    localStorage.setItem("user-info", JSON.stringify(result))
    console.log("result: ", result);
  }

  return (
    <div className="col-sm-6 offset-sm-3">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Link to="/todo">

          <Button variant="success" onClick={login} type="submit">
            LOGIN
          </Button>{" "}
        </Link>

        <Link to="/signup">
          <Button variant="success">
            SIGN UP
          </Button>
        </Link>

      </Form>
    </div>
  );
}

export default Login;
