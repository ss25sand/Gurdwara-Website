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
    // return today.toISOString();
    return today;
  }

  // Called before the Schedule is Rendered
  componentWillMount() {
    // Remove unnecessary styling
    $('#body').removeClass('loginBody');
    $('.button').hide();
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
      getMonth(year: ${this.getCurrentDateTime().getFullYear()}, month: ${this.getCurrentDateTime().getMonth()}) {
        days {
          date,
          weekdayNum,
          events {
            description,
            startDateTime,
            endDateTime
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

        {/* Iterate through the current textareaArray state to create the days */}
        <Query query={MONTH_QUERY}>
          {
            (result) => {
              console.log(result);
              if ($.isEmptyObject(result.data)) {
                return ""
              } else {
                return (
                  <form className="days">
                    {
                      result.data.getMonth.days.map((day, index) => {
                        console.log(day);
                        let digitClass = "";
                        if(day.id < 10) {
                          digitClass = "oneDigit";
                        }
                        return( <li> <span className = {digitClass}>{day.date}</span> <textarea id = {day.date} type = 'text' value = {day.text} onChange = {this.handleTextareaChange} disabled/> </li> );
                      })
                    }
                  </form>
                )
              }
            }
          }
        </Query>

        {/* SAVE button */}
        <button className = "button" onClick = {this.handleSaveButtonClick} style={{display: "none"}}> Save </button>

        {/* Message Displayer */}
        <h4> {this.state.message} </h4>

        {/*<Query query={MONTH_QUERY}>*/}
        {/*  {*/}
        {/*    (result) => $.isEmptyObject(result.data) ? "" : result.data.month*/}
        {/*  }*/}
        {/*</Query>*/}

      </div>
    );
  }
}
