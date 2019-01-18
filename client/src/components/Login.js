import React, {Component} from 'react';
import {SchedulePage} from './SchedulePage.js';
import './stylesheets/Login.css';
import $ from 'jquery';

// Component to render Login GUI
export class Login extends Component {
  constructor(props) {
    super(props);
    // Set initial user states
    this.state = {
      username: '',
      password: '',
      loginId: null
    }
    // Bind this to the event handlers
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
  }

  // Event handler to automatically update the text entered inside the username input
  handleUsernameInput(e) {
    this.setState({
      username: e.target.value
    });
  }

  // Event handler to automatically update the text entered inside the password input
  handlePasswordInput(e) {
    this.setState({
      password: e.target.value
    });
  }

  // Event handler for when LOGIN button is clicked
  handleLoginClick(e) {
    // Make request to check if login exists with the entered creditials
    fetch(`/users/login?username=${this.state.username}&password=${this.state.password}`)
      .then(res => res.json())
      .then(resjson => this.setState({ loginId: resjson }))
      .then(() => {
        $(document).ready( () => {
          // Displayer Error Message
          if(!this.state.loginId){
              $("#messageArea").html("Invalid Username or Password");
          }
        });
      });
  }

  render() {
    // if user hasn't logged in, render login page
    if(!this.state.loginId) {
      return (
        <div className="loginbox">
          <img src="avatar.png" className="avatar"/>
          <h1>Login Here</h1>
          <form>
              <p>Username</p>
              <input type="text" id="username" placeholder="Enter Username" onChange={this.handleUsernameInput} value={this.state.username}/>
              <p>Password</p>
              <input type="password" id="password" placeholder="Enter Password" onChange={this.handlePasswordInput} value={this.state.password}/>
              <div style={{"textAlign": "center"}}> <a id = "loginLink"> <button className = "button" type = "button" onClick = {this.handleLoginClick}> Login </button> </a> </div>
              <div id = "messageArea"></div>
          </form>
        </div>
      );
    } else {
      // render Calendar when user logs in with loginStatus props
      return (
        <SchedulePage id = {this.state.loginId} />
      );
    }
  }
}
