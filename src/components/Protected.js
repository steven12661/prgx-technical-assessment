import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

function Protected(props){
    let Cmp=props.Cmp
    const history = useHistory();

    //  useEffect(() => {
    //      if(localStorage.getItem('user-info'))
    //      {
    //        history.push("/signup")
    //      }
    //    }, )
    
    return(
        <div>
            <Cmp />
        </div>
    )
}

export default Protected