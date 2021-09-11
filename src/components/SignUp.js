import axios from 'axios';
import React, { Component } from 'react'
export default class Signup extends Component {

    handleSubmit = e =>{
        e.preventDefault();
        const data ={
            name : this.name,
            age : this.age,
            email: this.email,
            password : this.password
        };
        axios.post('https://api-nodejs-todolist.herokuapp.com/user/register', data)
        .then(
            res=> {
                console.log(res)
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
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Your Name"
                    onChange={e => this.name = e.target.value} />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" className="form-control" placeholder="Your Age"
                     onChange={e => this.age = e.target.value} />
                </div>
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
                    <button className="btn btn-primary btn-block" size="lg">Sign Up</button>
                </div>
            </form>
        )
    }
}
