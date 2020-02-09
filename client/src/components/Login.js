import React, {Component} from 'react';
import './stylesheets/Login.css';
import {MyDate} from '../MyDate.js'
import $ from 'jquery';
import Cookies from 'js-cookie'

// Component to render Login GUI
export class Login extends Component {


  render() {
    console.log(Cookies.get("AccessToken"));
    console.log(Cookies.get("RefreshToken"));
    console.log($.isEmptyObject(Cookies.get("AccessToken")) || $.isEmptyObject(Cookies.get("RefreshToken")));
    // if user hasn't logged in, render login page
    return (
      <div></div>
    );
  }
}
