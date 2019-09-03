import React, { Component } from 'react';
import './stylesheets/SchedulePage.css';
import './stylesheets/styleSheet.css';
import $ from 'jquery';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

// Component to render Calendar
export class SchedulePage extends Component {
  constructor(props) {
    super(props);
    // Set Initial States
    this.state = {
      message: '',
      textareaArray: [],
      data: {},
      updated: false
    };
    // Bind this to the event handlers
    this.handleTextareaChange = this.handleTextareaChange.bind(this);
    this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
  }

  getCurrentDateTime() {
    const today = new Date();
    return today.toISOString();
  }

  // Called before the Schedule is Rendered
  componentWillMount() {
    // Remove unnecessary styling
    $('#body').removeClass('loginBody');
    $('.button').hide();
    // Make Request to fetch the current schedule database
    fetch('/users')
      .then(res => res.json())
      .then(data => this.setState({ data: data }))
      .then(() => {
        console.log(this.state.data[0].id);
        // Create array to format recieved data
        let newArray = [];
        for(let i = 0; i < 28; i++) {
          newArray.push({id: this.state.data[i].id, text: this.state.data[i].event});
        }
        // set state using formated array
        this.setState({
          textareaArray: [...newArray]
        });
      });
    // Check if the user has logged in during this session
    let loginId;
    if(this.props.id) {
      localStorage.setItem('loginId', this.props.id);
      loginId = this.props.id;
    } else {
      loginId = Number(localStorage.getItem('loginId'));
    }
    // if user has logged in at some point during their session, enable textarea editting
    console.log(loginId);
    if(loginId) {
      fetch(`/users/login-status?id=${loginId}`)
        .then(res => res.json())
        .then(resjson => {
          console.log(resjson);
          if(resjson) {
            $(document).ready(() => {
              $('textarea').attr('disabled', false);
              $('.button').show();
            });
          }
        });
    }
    // Add event listener to automatically log user out on exit, reload, etc.
    $(window).on("beforeunload", function () {
      // fetch request to change login status
        fetch(`/users/update-login-status?id=${loginId}`)
          .then( () => localStorage.setItem("loginId", 0));
      return "Please don't leave me!";
    });
  }

  // Make put request to Update Database when SAVE button is clicked
  handleSaveButtonClick() {
    if(this.state.updated) {
      let endpoint = $.param({ array: this.state.textareaArray });
      fetch(`/users/update-event?${endpoint}`)
        .then( res => res.json())
        .then( message => {
          this.setState({ message: message })
        });
    } else {
      this.setState({ message: "No Updates Were Made..." });
    }
  }

  // Event handler to automatically update the text entered inside the textarea
  handleTextareaChange(e) {
    // Make a formated array with updated events
    let newEvent = this.state.textareaArray.map(day => {
      if(day.id === Number(e.target.id)) {
        return {
          id: Number(e.target.id),
          text: e.target.value
        }
      } else {
        return {
          id: day.id,
          text: day.text
        }
      }
    });
    // Set the state
    this.setState({
      textareaArray: [...newEvent],
      updated: true
    });
  }

  render() {
    const MONTH_QUERY = gql`{
      month(dateTime: "${this.getCurrentDateTime()}") {
       weeks {
          days {
            dateTime
            weekday
            event {
              description
            }
          }
        }
      }
    }`;

    return (
      <div className="body">

        {/* Header Picture*/}
        <img className = "headerPic" src = "clockWallpaper.jpg" alt = "Picture of Harmandir Sahib"/>
        {/* Main Heading*/}
        <h1 className = "inPicHeading"> SCHEDULE </h1>
        {/* Body Text*/}
        <div className = "textContainer">
            <h2 className = "centerText"> Book a program! </h2>
            <p>
               To book your program now, please find an available date in the schedule, and contact the Cambridge
               Gurdwara by calling <strong>(519) 658-1070</strong>, or visiting <strong>1070 Townline Road, Cambridge,
               Ontario</strong>. The changes in the schedule can be viewed shortly after the booking.
            </p>
        </div>

    {/* Calendar */}

        {/* Render Month Heading */}
        <div className="month">
          <ul>
            <li className="prevMonth">&#10094;</li>
            <li className="nextMonth">&#10095;</li>
            <li>
              <div>
                February <br/>
                <span style={{"fontSize":18}}>2019</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Render weekday Headings */}
        <ul className="weekdays">
          <li>Su</li>
          <li>Mo</li>
          <li>Tu</li>
          <li>We</li>
          <li>Th</li>
          <li>Fr</li>
          <li>Sa</li>
        </ul>

        {/* Iterate through the current textareaArray state to create the days
        <Query query={this.MONTH_QUERY}> */}
        <form className="days">
            {this.state.textareaArray.map((day, index) => {
              let digitClass = "";
              if(day.id < 10) {
                digitClass = "oneDigit";
              }
              return( <li> <span className = {digitClass}>{day.id}</span> <textarea id = {day.id.toString()} type = 'text' value = {day.text} onChange = {this.handleTextareaChange} disabled/> </li> );
            })}
        </form>
        {/* </Query> */}

        {/* SAVE button */}
        <button className = "button" onClick = {this.handleSaveButtonClick} style={{display: "none"}}> Save </button>

        {/* Message Displayer */}
        <h4> {this.state.message} </h4>

        <Query query={MONTH_QUERY}>
          {
            (result) => $.isEmptyObject(result.data) ? "" : result.data.month
          }
        </Query>

      </div>
    );
  }
}
