import React, {Component} from 'react';
import './stylesheets/styleSheet.css';

// Component to render About Page
export class AboutPage extends Component {
  render() {
    return (
      <div className = "body">
          {/* Header Picture*/}
          <img className = "headerPic" src = "harmandirSahibHeaderPic.jpg" alt = "Picture of Harmandir Sahib"/>
          {/* Main Heading*/}
          <h1 className = "inPicHeading"> GURDWARA </h1>
          {/* Body Text*/}
          <div className = "textContainer">
              <h2 className = "centerText"> What is a Gurdwara? </h2>

              <p className = "centerText">A gurdwara is defined as a place of worship for Sikhs. The literal meaning of the word "Gurdwara" is a gateway to which the guru could be reached or "the door that leads to the guru".</p>

              <h2 className = "centerText"> The Purpose of a Gurdwara </h2>

              <ol>
                  <li> To learn spiritual wisdom taught by Sri Guru Granth Sahib Ji </li>
                  <li> Gurdwaras are home to many Sikh religious ceremonies. </li>
                  <li> Gurdwaras can teach children about the Sikh faith, ethics, customs, traditions, and text. </li>
                  <li> A Gurdwara also acts as a community centre and offers food, shelter, and companionship to whoever is in need, from any religion or background. </li>
                  <li> A Gurdwara can also act as a hub to which the Sikh population can give back to the community to which it resides through volunteer and charity. </li>
              </ol>
          </div>

          <img className = "headerPic" src = "cambridgeHeaderPic.jpg" alt = "Picture of Cambridge" style={{"margin-top": 75}}/>

          <div className = "textContainer" id = "widerPara">

              <h2 className = "centerText"> Cambridge, Ontario </h2>

              <p>
                  Located accessibly off highway 401, the city of Cambridge has witnessed great growth over the last couple of decades. Under 100 km west of the Greater Toronto Area, and next door to the technology hub of Waterloo Ontario, Cambridge is poised for further growth in population and industry. The Sikh community has also been apart of this growth. With a small town feel, Cambridge offers families a sense of comfort, security, belonging, and peace. The Sikh population has grown tremendously in Cambridge within the last 10 years, and is in a position to grow further in the next coming years. The Sikh community in Cambridge is dedicated in building a new home for Sri Guru Granth Sahib Ji that will be able meet the needs of the growing population.
                  <br/> <br/> For further information to our beloved city feel free to click on the following images:
              </p>

              {/* Image Grip Container */}
              <div className = "imageContainer">
                <a href = "https://www.cambridge.ca/en/index.aspx" target = "_blank"> <img className = "imageRow img1" src = "cambridgeLogoPic.jpg" alt = "Picture of cambridge.ca Logo"/> </a>
                <a href = "http://visitcambridgeontario.com/" target = "_blank"> <img className = "imageRow img2" src = "visitCambridgeOntarioLogoPic.png" alt = "Picture of visitcambridgeontario.com Logo"/> </a>
                <a href = "https://www.cambridgetimes.ca/" target = "_blank"> <img className = "imageRow img3" src = "cambridgeTimesLogoPic.png" alt = "Picture of Cambridge Times Logo"/> </a>
              </div>

          </div>
      </div>
    );
  }
}
