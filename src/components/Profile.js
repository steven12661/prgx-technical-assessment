import axios from 'axios'
import React, { useState, useEffect, Component } from 'react'
import MaterialTable from 'material-table'
import { Modal, TextField, Button } from '@material-ui/core'


export default class Profile extends Component {


    render() {
        if (this.props.user) {
            return (
                <div>
                    <h1>Profile</h1>
                    <hr/>
                    <h2> Your info </h2>
                    <h4>Name: {this.props.user.name} </h4>
                    <h4>Age: {this.props.user.age} </h4>
                    <h4>email: {this.props.user.email} </h4>


                    <div className="d-grid gap-2">
                        <button className="btn btn-primary btn-block" size="lg" disabled>Edit Profile</button>
                    </div>

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
