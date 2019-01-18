import React, {Component} from "react";
import {BrowserRouter, Route} from "react-router-dom";

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
            <BrowserRouter>
              <div>
                <Header />
                <Route exact path="/home" component={HomePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/project" component={ProjectPage} />
                <Route path="/schedule" component={SchedulePage} />
                <Route path="/login" component={LoginPage} />
                <Footer />
              </div>
            </BrowserRouter>
        );
    }
}
