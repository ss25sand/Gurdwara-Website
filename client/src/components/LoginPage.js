import React, {Component} from 'react';
import {Login} from "./Login.js";
import './stylesheets/styleSheet.css';

// Component to act as container for login system
export class LoginPage extends Component {
  render() {
    return (
      <div id = "body" className = "body loginBody">
        {/* Call Login JS Component */}
        <div><Login /></div>
      </div>
    );
  }
}
