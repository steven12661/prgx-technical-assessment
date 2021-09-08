import React, { Component } from 'react'



function ProfileSettings(){
    let user = localStorage.getItem('user-info')
    return (
        <div>
            <h1>Profile Settings</h1>
            <h3>{user}</h3>


        </div>
    )
}

export default ProfileSettings