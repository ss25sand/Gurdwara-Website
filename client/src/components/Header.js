import React, {Component} from 'react';
import './stylesheets/Header.css';

// Component to render header
export class Header extends Component {
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
                      <li > <a href = "/login"> <button id = "buttonEffect"  type = "button"> Login </button> </a> </li>
                  </ul>
              </div>
          </nav>
      </header>
    );
  }
}
