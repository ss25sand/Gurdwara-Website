import React, {Component} from 'react';
import {Slideshow} from "./Slideshow.js"
import './stylesheets/styleSheet.css';

// Component to render Project Page
export class ProjectPage extends Component {
  render() {
    return (
      <div className = "body">
          {/* Header Picture */}
          <img className = "headerPic" src = "constructionWallpaper.jpg" alt = "Picture of Construction Worker Holding Hard Hat"/>

          {/* Main Heading */}
          <h1 className = "inPicHeading"> Project Updates </h1>

          {/* Body Text */}
          <div className = "textContainer">

              <h2 className = "centerText"> Cambridge Gurdwara Updated Construction Pictures </h2>
              <h5 className = "centerText"> Cambridge Gurdwara - November 23, 2016</h5>
              <p> <strong> Waheguru Ji Ka Khalsa Waheguru Ji Ki Fateh </strong> <br/> <br/>
                  Sadh Sangat Ji, <br/> <br/>
                  Here are some updated images from inside Guru Ghar taken on Sunday November 20th. As mentioned in the previous update, we can always use volunteers every Sunday for clean up related help.
              </p>

          </div>

          {/* Call Slideshow JS Component */}
          <Slideshow slides = "mySlides1" />

          <div className = "textContainer" style = {{"marginTop": 50}}>

              <p>
                  We will continue to provide updates and new images on Guru Ghar as they occur. Please continue to check this website for new updates.
                  <br/> <br/> <strong > Waheguru Ji Ka Khalsa Waheguru Ji Ki Fateh </strong>
              </p>

          </div>

          {/* Body Text */}
          <div className = "textContainer">

              <h2 className = "centerText"> Volunteers Needed For Weekly Sunday Clean Up </h2>
              <h5 className = "centerText"> Cambridge Gurdwara - October 23, 2016</h5>
              <p> <strong > Waheguru Ji Ka Khalsa Waheguru Ji Ki Fateh </strong> <br/> <br/>
                  Sadh Sangat Ji, <br/> <br/>
                  The construction work has begun and we are now requesting and requiring volunteers to help with a weekly clean up. This allows us to save money as we will be doing clean up seva ourselves instead of hiring a contractor for cleaning labour. Weekly clean ups will occur every Sunday at guru khar.
                  <br/> <br/> Please feel free to share this website link with Sadh Sangat ji members to spread the work and get more volunteers. Here are a few images from today's clean up.
              </p>

          </div>

          {/* Call Slideshow JS Component */}
          <Slideshow slides = "mySlides2" />

          {/* Body Text */}
          <div className = "textContainer">

              <h2 className = "centerText"> Construction beginning Oct 9, 2016 </h2>
              <h5 className = "centerText"> Cambridge Gurdwara - October 5, 2016</h5>
              <p>
                  <strong > Waheguru Ji Ka Khalsa Waheguru Ji Ki Fateh </strong> <br/> <br/>
                  Sadh Sangat Ji, <br/> <br/>
                  We are happy to tell you that the work to finish our Gurudwara will start again on Sunday October 9, 2016. We hope that all of our Sangat can join us at the Gurughar on Sunday when we join together in Ardaas to start our project up again.  We will officially hand the key to our new builder, SKC Construction.  Following this will be the start of Sehaj Paath as we continue with our project.
                  <br/> <br/> We hope that all of our Sangat and their family members will join us at 11am at our Gurudwara Sahib as we move forward with our project.
                  <br/> <br/> Thank you to everyone for your continued support.
                  <br/> <br/> <br/> <strong > Waheguru Ji Ka Khalsa Waheguru Ji Ki Fateh </strong>
              </p>

          </div>

          <div className = "textContainer">

              <h2 className = "centerText"> Building Committee </h2>
              <h5 className = "centerText"> Cambridge Gurdwara - January 24, 2016</h5>
              <p>
                  Dec 4th, 2015 <br/> <br/>
                  The Operations Committee has asked the Building Committee to provide the Sangat an update. Please find this message below.
                  <br/> <br/> <strong > Waheguru Ji Ka Khalsa Waheguru Ji Ki Fateh </strong> <br/> <br/>
                  A General Body Meeting was held with the membership on Sunday November 22nd, 2015.  During this meeting, the membership in attendance recognized that an impasse had been reached by the Operations Committee with regards to how to proceed with completing the construction project of our new Gurdwara.  A motion was put forward to select a Building Committee in order to complete what remains of our project.  The motion to select a new Building Committee passed and the following seven members volunteered to assist with this project:
              </p>
              <ul>
                  <li> Manmohan Singh Sandhu </li>
                  <li> Daljit Singh Brar </li>
                  <li> Harvinder Singh </li>
                  <li> Irindeep Kaur Badial </li>
                  <li> Jasbir Singh Cheema </li>
                  <li> Jasvir Singh Sadhra </li>
                  <li> Kulbir Singh Tutt </li>
              </ul>
              <p>
                  Another motion was passed, giving these individuals the support of the membership and Sangat in order to complete the project that is already underway. <br/> <br/>
                  The new Building Committee appreciates the support that they have already been given and the efforts put forth by the Operations Committee and Sangat.  Please contact any member of the Building Committee if you have any questions.
                  <br/> <br/> <strong > Waheguru Ji Ka Khalsa Waheguru Ji Ki Fateh </strong>
              </p>

          </div>
      </div>
    );
  }
}
