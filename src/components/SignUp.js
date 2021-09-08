import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {useHistory, withRouter} from 'react-router-dom'

function SignUp() {
  const history = useHistory();

  //  useEffect(() => {
  //    if(localStorage.getItem('user-info'))
  //    {
  //      history.push("/todo")
  //    }
  //  }, )


  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
   async function register() {
    let item={name, age, email, password}
     console.log(item);
     let result = await fetch("https://api-nodejs-todolist.herokuapp.com/user/register",{
         method:'POST',
         body: JSON.stringify(item),
         headers:{
            "Content-Type":"application/json"
         } 

     })
     result = await result.json()
     localStorage.setItem("user-info", JSON.stringify(result))
     console.log("result: ", result)
     history.push("/todo")
     console.log(history.push("History PUSHED","/todo"))
  }

  return (
    <div className="col-sm-6 offset-sm-3">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Age</Form.Label>
          <Form.Control type="number" value={age} onChange={(e)=>setAge(e.target.value)} placeholder="Age" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="example@email.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          <Form.Text className="text-muted">Must be 8 characters long</Form.Text>
        </Form.Group>

        <Button variant="success" onClick={register}>
          SIGN UP
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
