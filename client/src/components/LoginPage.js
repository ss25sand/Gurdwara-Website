import React, {Component} from 'react';
import {Login} from "./Login.js";
import './stylesheets/styleSheet.css';
import $ from "jquery";
import Cookies from "js-cookie";
import {SchedulePage} from "./SchedulePage";
import {MyDate} from "../MyDate";

// Component to act as container for login system
export class LoginPage extends Component {
  constructor(props) {
    super(props);
    // Set initial user states
    this.state = {
      username: '',
      password: '',
      email: '',
      loginId: null,
      isLoginChecked: false
    };
    // Bind this to the event handlers
    this.handleUsernameInput = this.handleUsernameInput.bind(this);
    this.handlePasswordInput = this.handlePasswordInput.bind(this);
    this.handleEmailInput = this.handleEmailInput.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
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

  // Event handler to automatically update the text entered inside the email input
  handleEmailInput(e) {
    this.setState({
      email: e.target.value
    });
  }

  // Event handler for when LOGIN button is clicked
  async handleLoginClick() {
    try {
      Cookies.set("username", this.state.username);
      Cookies.set("password", this.state.password);
      const res = await fetch(`http://localhost:8080/session`, {
        method: "POST",
        credentials: "include"
      });
      const { accessToken, refreshToken } = await res.json();
      console.log("LOGin");
      console.log(accessToken, refreshToken);
      console.log("LOGin");
      Cookies.set("AccessToken", accessToken.value, { path: '/', expires: (new MyDate()).addMinutes(15) });
      Cookies.set("RefreshToken", refreshToken.value, { path: '/', expires: (new MyDate()).addHours(1) });
    } catch (e) {
      console.log("error registering user:", e);
      // let message = "User Already Exists!";
      //           $(document).ready( () => {
      //             $("#messageArea").html(message);
      //           });
    } finally {
      Cookies.remove("username");
      Cookies.remove("password");
    }
  }

  async handleRegisterClick() {
    try {
      Cookies.set("email", this.state.email);
      Cookies.set("username", this.state.username);
      Cookies.set("password", this.state.password);
      const res = await fetch(`http://localhost:8080/user`, {
        method: "POST",
        credentials: "include"
      });
      const { accessToken, refreshToken } = await res.json();
      // console.log(accessToken, refreshToken);
      // set token cookies
      Cookies.set("AccessToken", accessToken.value, { path: '/', expires: (new MyDate()).addMinutes(15) });
      Cookies.set("RefreshToken", refreshToken.value, { path: '/', expires: (new MyDate()).addHours(1) });
    } catch (e) {
      console.log("error registering user:", e);
      // let message = "User Already Exists!";
      //           $(document).ready( () => {
      //             $("#messageArea").html(message);
      //           });
    } finally {
      Cookies.remove("email");
      Cookies.remove("username");
      Cookies.remove("password");
    }
  }

  handleCheckboxChange() {
    const self = this;
    $(document).ready(function () {
      self.setState({
        isLoginChecked: $('input[type="checkbox"]').is(":checked")
      });
    })
  }

  render() {
    console.log(Cookies.get("AccessToken"));
    console.log(Cookies.get("RefreshToken"));
    if($.isEmptyObject(Cookies.get("AccessToken")) || $.isEmptyObject(Cookies.get("RefreshToken"))) {
      return (
        <div id = "body" className = "body loginBody">
          <div className="loginbox">
            <img src="avatar.png" className="avatar"/>
            <div className="can-toggle">
              <input id="a" type="checkbox" onChange={this.handleCheckboxChange}/>
              <label htmlFor="a">
                <div className="can-toggle__switch" data-checked="Login" data-unchecked="Register"/>
              </label>
            </div>
            <h1>{this.state.isLoginChecked ? 'Login' : 'Register'}</h1>
            <form>
              { !this.state.isLoginChecked &&
              <div>
                <p>Email</p>
                <input type="email" id="email" placeholder="Enter Email" onChange={this.handleEmailInput} value={this.state.email} />
              </div>
              }
              <p>Username</p>
              <input type="text" id="username" placeholder="Enter Username" onChange={this.handleUsernameInput} value={this.state.username}/>
              <p>Password</p>
              <input type="password" id="password" placeholder="Enter Password" onChange={this.handlePasswordInput} value={this.state.password}/>
              {
                this.state.isLoginChecked ?
                  <div style={{"margin": "0 auto"}}> <button className = "button" type = "button" onClick = {this.handleLoginClick}> Login </button> </div> :
                  <div style={{"margin": "0 auto"}}> <button className = "button" type = "button" onClick = {this.handleRegisterClick}> Register </button> </div>
              }
              <div id = "messageArea"/>
            </form>
          </div>
        </div>
      );
    } else {
      // render Calendar when user logs in
      return (
        <SchedulePage />
      );
    }
  }
}
