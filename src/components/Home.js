import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Home extends Component {


    render() {
        if (this.props.user) {
            return (
                <div>
                    <h3>Hi, {this.props.user.name} </h3>
                    <br />
                    <Link to="/todo" className="d-grid gap-2">
                        <button className="btn btn-primary btn-block" size="lg">To-Do List</button>
                    </Link>

                </div>
            )
        }
        return (
            <div>
                <h2>You are not logged in </h2>
            </div>
        )
    }
}
