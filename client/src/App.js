import React, {Component} from "react";
import {BrowserRouter, Switch, Redirect, Route} from "react-router-dom";

import {Header} from "./components/Header.js";
import {HomePage} from "./components/HomePage.js";
import {AboutPage} from "./components/AboutPage.js";
import {ProjectPage} from "./components/ProjectPage.js";
import {SchedulePage} from "./components/SchedulePage.js";
import {LoginPage} from "./components/LoginPage.js";
import {Footer} from "./components/Footer.js";

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <BrowserRouter>
            <Switch>
              <Route exact path="/home" component={HomePage} />
              <Route path="/about" component={AboutPage} />
              <Route path="/project" component={ProjectPage} />
              <Route path="/schedule" component={SchedulePage} />
              <Route path="/login" component={LoginPage} />
              <Redirect from="/" to="/home" />
            </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}
