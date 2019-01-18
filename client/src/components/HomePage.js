import React, {Component} from 'react';
import './stylesheets/styleSheet.css';

// Component to render Home Page
export class HomePage extends Component {
  render() {
    return (
      <div className = "body">
          {/* Header Picture */}
          <img className = "headerPic" src = "cambridgeGurdwaraHeaderPic.jpg" alt = "Picture of Cambridge Gurdwara Design"/>
          {/* Page Heading */}
          <div className = "homePageHeaderTitle">
              <h1 className = "centerText test"> Sri Guru Singh Sabha Cambridge </h1>
              <h4 className = "centerText">
                  1070 Townline Road, Cambridge, Ontario <br/>
                  (519) 658-1070
              </h4>
          </div>
          {/* Place to insert google maps api */}
          <div id="map"></div>
          {/* Learn More Grid */}
          <div id = "big" className = "imageContainer">
              <h3 className = "head1 headRow"> Gurdwara </h3>
              <h3 className = "head2 headRow"> Cambridge, Ontario </h3>
              <h3 className = "head3 headRow"> Project Updates </h3>
              <div className = "innerContainer1">
                  <img className = "imageRow img1" src = "harmandirSahibPic.png" alt = "Picture of Harminder Sahib"/>
                  <div className = "learn1 learnRow"> LEARN MORE </div>
              </div>
              <div className = "innerContainer2">
                  <img className = "imageRow img2" src = "cambridgePic.png" alt = "Picture of Cambridge, Ontario"/>
                  <div className = "learn2 learnRow"> LEARN MORE </div>
              </div>
              <div className = "innerContainer3">
                  <img className = "imageRow img3" src = "constPic1.png" alt = "Picture of Gurdwara Construction"/>
                  <div className = "learn3 learnRow"> LEARN MORE </div>
              </div>
          </div>
      </div>
    );
  }
}
