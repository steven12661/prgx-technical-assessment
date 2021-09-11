import axios from 'axios';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class NavbarComp extends Component {
    

    handleLogout = () => {

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + sessionStorage.getItem('token')
        //     }
        // }

        // axios.post('https://api-nodejs-todolist.herokuapp.com/user/logout',config)
        // .then(
        //     res=> {
        //         console.log(res)
        //         console.log("Logged out corretly")
        //     }
        // ).catch(
        //     err => {
        //         console.log(err);
        //         console.log("Error. Token:"+sessionStorage.getItem('token'));
        //     }
        // )
        sessionStorage.clear();
        this.props.setUser(null);
        console.log("Logged out ")
    };
    


    render() {
        let buttons;
        if (this.props.user) {
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/todo'}>To-Do</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/'} onClick={this.handleLogout}>Logout</Link>
                    </li>
                </ul>
            )

        } else {
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/login'}>Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/signup'}>Sign up</Link>
                    </li>
                </ul>
            )
        }
        return (
            <div>
                <nav className="navbar navbar-expand navbar-light fixed-top">
                    <Link className="navbar-brand" to={'/'}>Home</Link>

                    <div className="containter">
                        <div className="collapse navbar-collapse">
                            {buttons}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}
