import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink, useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import ProfileSettings from './components/ProfileSettings';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import Todo from './components/Todo';
// import Home from './components/Home'
import NavbarComp from './components/NavbarComp';
function App() {

  const [authLoading, setAuthLoading] = useState(true);
  const history = useHistory();
  const logOutUrl = "https://api-nodejs-todolist.herokuapp.com/user/logout"

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get('https://api-nodejs-todolist.herokuapp.com/user/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      //  removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <NavbarComp />
          <br />

          {/* Home Component */}
          {/* <div className="auth-wrapper">
            <div className="auth-inner">
              <Home />
            </div>
          </div> */}

          <div className="content">
            <Switch>
              <Route exact path="/" component={Todo} />
              <PublicRoute path="/signup" component={SignUp} />
              <PublicRoute path="/login" component={Login} />
              <PrivateRoute path="/todo" component={Todo} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/profilesettings" component={ProfileSettings} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;