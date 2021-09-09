import React from 'react'
import JSONPretty from 'react-json-pretty'


function Profile(){
    const user = sessionStorage.getItem('user')
    
    return (
        <div>
            <h1>Profile</h1>
            
            <JSONPretty data={user} />


        </div>
    )
}

export default Profile