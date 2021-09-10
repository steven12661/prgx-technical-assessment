import React from 'react'
import JSONPretty from 'react-json-pretty'


function Profile() {
    const user = sessionStorage.getItem('user')

    return (
        <div>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h2> Profile</h2>
                </div>
            </div>

            <JSONPretty data={user} />


        </div>
    )
}

export default Profile