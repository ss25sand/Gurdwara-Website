import React, {Component} from 'react';
import './stylesheets/Slideshow.css';

// Object to hold image details (index, src, desciption, orientation) and group images together
const slideshowPictures = {
  mySlides1: {
    '1': {
      src: 'constPic2.jpg',
      text: 'Concrete has been poured on front spiral staircase.',
      orientation: 'portrait'
    },
    '2': {
      src: 'constPic3.jpg',
      text: 'Concrete has been poured on front spiral staircase.',
      orientation: 'portrait'
    },
    '3': {
      src: 'constPic4.jpg',
      text: 'Main entrance front wall installation.',
      orientation: 'landscape'
    },
    '4': {
      src: 'constPic5.jpg',
      text: 'Main entrance front wall installation.',
      orientation: 'landscape'
    },
    '5': {
      src: 'constPic6.jpg',
      text: 'Geothermal installation.',
      orientation: 'portrait'
    },
    '6': {
      src: 'constPic7.jpg',
      text: 'Ramp installation to langhar hall.',
      orientation: 'portrait'
    },
  },
  mySlides2: {
    '1': {
      src: 'constPic8.jpg',
      text: 'Back staircase sweeping.',
      orientation: 'landscape'
    },
    '2': {
      src: 'constPic9.jpg',
      text: 'Floor installation.',
      orientation: 'portrait'
    },
    '3': {
      src: 'constPic10.jpg',
      text: 'Floor installation.',
      orientation: 'portrait'
    }
  }
};

// Component to render image slideshow
export class Slideshow extends Component {
  constructor(props){
    super(props);
    // Set inital slide for each slideshow instance
    this.state = {
      curIndex: '1',
      curSrc: slideshowPictures[this.props.slides]['1'].src,
      curText: slideshowPictures[this.props.slides]['1'].text
    }
    // Bind this to the event handlers
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }

  // Event handler for LEFT Button Click
  handleLeftClick() {
    // Check bounds of slideshow to check if there is an image in the slides object before the current slide
    let leftIndex = Number(this.state.curIndex);
    if(leftIndex >= 2){
      (--leftIndex).toString(10);
      // Change Current Image Slide
      this.setState({
        curIndex: leftIndex,
        curSrc: slideshowPictures[this.props.slides][leftIndex].src,
        curText: slideshowPictures[this.props.slides][leftIndex].text
      });
    }
  }

  // Event handler for RIGHT Button Click
  handleRightClick() {
    // Check bounds of slideshow to check if there is an image in the slides object before the current slide
    let rightIndex = Number(this.state.curIndex);
    if(rightIndex <= Object.keys(slideshowPictures[this.props.slides]).length - 1){
      (++rightIndex).toString(10);
      // Change Current Image Slide
      this.setState({
        curIndex: rightIndex,
        curSrc: slideshowPictures[this.props.slides][rightIndex].src,
        curText: slideshowPictures[this.props.slides][rightIndex].text
      });
    }
  }

  render() {
    return (
      <div className = "slideshow-container">
        {/* Display Current Image Index */}
        <div className = "numbertext">{this.state.curIndex} / {Object.keys(slideshowPictures[this.props.slides]).length}</div>
        {/* Display Current Image */}
        <div className = {slideshowPictures[this.props.slides][this.state.curIndex]['orientation']}><img src = {this.state.curSrc}/></div>
        {/* Display Current Image Desciption */}
        <div className = "text"> {this.state.curText} </div>
        {/* Left and Right buttons */}
        <a className = "prev" onClick = {this.handleLeftClick}>&#10094;</a>
        <a className = "next" onClick = {this.handleRightClick}>&#10095;</a>
      </div>
    );
  }
}
