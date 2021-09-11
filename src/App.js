import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/Home';
import NavbarComp from './components/NavbarComp';
import Login from './components/Login'
import Signup from './components/SignUp'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import { Component } from 'react';
import axios from 'axios';
import Todo from './components/Todo';


export default class App extends Component {
  state = {};
  componentDidMount =() => {
      const config = {
          headers: {
              'Authorization' : 'Bearer '+sessionStorage.getItem('token')
          }
      }
       axios.get('https://api-nodejs-todolist.herokuapp.com/user/me', config)
       .then(
           res => {
            this.setUser(res.data);
           },
           err => {
               console.log(err)
           }
       )
       
  };

  setUser = user => {
    this.setState({
      user: user
  });

  };

  render(){
    return(
      <BrowserRouter > 
      <div className="App">
        <NavbarComp user={this.state.user} setUser={this.setUser} />
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={()=><Home user={this.state.user} />} />
              <Route exact path="/login" component={() => <Login setUser={this.setUser} />}/>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/todo" component={Todo} />

              </Switch>
            {/* <Home /> */}
          </div>
        </div>
      </div>
      </BrowserRouter>
    )
  }
}