import React, {Component} from 'react';
import './stylesheets/Header.css';
import $ from "jquery";
import Cookies from "js-cookie";

// Component to render header
export class Header extends Component {
  constructor() {
    super();
    this.handleViewAccountClick = this.handleViewAccountClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleViewAccountClick() {

  }

  handleLogoutClick() {
    console.log("LOGOUT!!!", Cookies.get("AccessToken"));
    Cookies.remove("AccessToken");
    Cookies.remove("RefreshToken");
  }

  render() {
    return (
      <header>
          <nav>
              <h1> CAMBRIDGE GURDWARA </h1>
              <div id = "topRight">
                  <ul>
                      <li > <a className = "orangeHover" href = "/home"> HOME </a> </li>
                      <li> <a className = "orangeHover" href = "/about"> ABOUT </a> </li>
                      <li> <a className = "orangeHover" href = "/project"> PROJECT UPDATES </a> </li>
                      <li> <a className = "orangeHover" href = "/schedule"> SCHEDULE </a> </li>
                      {$.isEmptyObject(Cookies.get("AccessToken")) || $.isEmptyObject(Cookies.get("RefreshToken")) ?
                        <li> <a href = "/login"> <button id = "buttonEffect"  type = "button"> Login </button> </a> </li> :
                        <li className="dropbtn"> <a className="dropbtn"> <img id = "accountIcon" src="avatar.png" className="avatar"/> </a> </li>
                      }
                      <div className="dropdown-content">
                        <a href = "/account" onClick = {this.handleViewAccountClick}>View Account</a>
                        <a href="#" onClick = {this.handleLogoutClick}>Log out</a>
                      </div>
                  </ul>
              </div>
          </nav>
      </header>
    );
  }
}
