import React, { Component } from 'react'
import axios from 'axios';
import {
    BrowserRouter as Router,
    Link,

} from "react-router-dom";
export default class Login extends Component {
    handleSubmit = e =>{
        e.preventDefault();
        const data ={
            email: this.email,
            password : this.password
        };
        axios.post('https://api-nodejs-todolist.herokuapp.com/user/login', data)
        .then(
            res=> {
                sessionStorage.setItem('token', res.data.token)
                console.log("token was stored in sessionStorage")
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Log in</h3>


                <div className="form-group">
                    <label>email</label>
                    <input type="email" className="form-control" placeholder="email@example.com"
                        onChange={e => this.email = e.target.value} />
                </div>
                <div className="form-group">
                    <label>password</label>
                    <input type="password" className="form-control" placeholder="Password"
                        onChange={e => this.password = e.target.value} />
                </div>
                <br />
                <div className="d-grid gap-2">
                    <Link to="/signup" className="d-grid gap-2">
                        <button className="btn btn-primary btn-block" size="lg">Sign up</button>
                    </Link>
                    <button className="btn btn-primary btn-block" size="lg">Log In</button>

                </div>
            </form>
        )
    }
}
