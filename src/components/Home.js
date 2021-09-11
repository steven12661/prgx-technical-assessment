import React, { Component } from 'react'

export default class Home extends Component {


    render() {
        if (this.props.user) {
            return (
                <h2>Hi, {this.props.user.name} </h2>
            )
        }
        return (
            <div>
                <h2>You are not logged in </h2>
            </div>
        )
    }
}
