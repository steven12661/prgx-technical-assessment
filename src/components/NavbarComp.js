import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class NavbarComp extends Component {
    render() {
        let buttons;
        if (this.props.user) {
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/todo'}>To-Do</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={'/'} onClick={() => sessionStorage.clear()}>Logout</Link>
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
