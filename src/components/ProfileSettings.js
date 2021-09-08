import React, { Component } from 'react'
import JSONPretty from 'react-json-pretty'


function ProfileSettings(){
    const user = sessionStorage.getItem('user')
    
    return (
        <div>
            <h1>Profile Settings</h1>
            
            <JSONPretty data={user} />


        </div>
    )
}

export default ProfileSettings