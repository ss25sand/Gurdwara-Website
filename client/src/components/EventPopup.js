import React, {Component} from 'react';
import './stylesheets/styleSheet.css';
import './stylesheets/EventPopup.css'

// Component to act as container for login system
export class EventPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      startTime: '',
      endTime: '',
      organizer: '',
      description: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleOrganizerChange = this.handleOrganizerChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }

  handleStartTimeChange(e) {
    this.setState({startTime: e.target.value});
  }

  handleEndTimeChange(e) {
    this.setState({endTime: e.target.value});
  }

  handleOrganizerChange(e) {
    this.setState({organizer: e.target.value});
  }

  handleDescriptionChange(e) {
    this.setState({description: e.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    const style = {
      position: "absolute",
      top: this.props.position.top,
      left: this.props.position.left,
      right: this.props.position.right,
      bottom: this.props.position.bottom,
      width: this.props.position.width.toString() + "px",
      height: this.props.position.height.toString() + "px",
    };
    console.log(style);
    return (
      <div className="body">
        <form onSubmit={this.handleSubmit} className="popup" style={style}>
          <input type="text" value={this.state.title} onChange={this.handleTitleChange} style={{gridArea: "1 / 2 / 2 / 3"}} placeholder="Title" />

          <img src="timeIcon.png" alt="Time Icon" className="icon" style={{gridArea: "2 / 1 / 3 / 2"}} />
          <div style={{gridArea: "2 / 2 / 3 / 22"}}>
            <input type="text" value={this.state.startTime} onChange={this.handleStartTimeChange} placeholder="Start Time" />
            <span> - </span>
            <input type="text" value={this.state.endTime} onChange={this.handleEndTimeChange} placeholder="End Time" />
          </div>

          <img src="organizerIcon.jpg" alt="Organizer Icon" className="icon" style={{gridArea: "3 / 1 / 4 / 2"}} />
          <input type="text" value={this.state.organizer} onChange={this.handleOrganizerChange} style={{gridArea: "3 / 2 / 4 / 3"}} placeholder="Organizer Name" />

          <img src="descriptionIcon.jpg" alt="Description Icon" className="icon" style={{gridArea: "4 / 1 / 5 / 2", alignSelf: "flex-start"}} />
          <textarea type="text" value={this.state.description} onChange={this.handleDescriptionChange} style={{gridArea: "4 / 2 / 5 / 3"}} placeholder="Description" />

          <div className="submitPanel" style={{gridArea: "5 / 2 / 6 / 3"}}>
            <input type="submit" value="Save" />
            <input type="submit" value="Cancel" onClick={this.props.closePopup} />
          </div>
        </form>
      </div>
    );
  }
}
