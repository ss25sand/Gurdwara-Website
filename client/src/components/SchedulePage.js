import React, {Component} from 'react';
import {EventPopup} from "./EventPopup.js";
import './stylesheets/SchedulePage.css';
import './stylesheets/styleSheet.css';
import $ from 'jquery';
import {Query} from 'react-apollo'
import gql from 'graphql-tag'

// Component to render Calendar
export class SchedulePage extends Component {
  constructor(props) {
    super(props);
    // Set Initial States
    this.state = {
      showEventPopup: false,
      popupPosition: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
      },
    };
    // Bind this to the event handlers --> do I still have to do this?
    this.togglePopup = this.togglePopup.bind(this);
    this.onDateClick = this.onDateClick.bind(this);
  }

  static getCurrentDateTime() {
    return new Date();
  }

  togglePopup() {
    this.setState({
      showEventPopup: !this.state.showEventPopup
    });
  }

  onDateClick(e) {
    const relPosition = e.target.getBoundingClientRect();
    const absPosition = $(e.target).position();
    if (absPosition.left < $(window).width() / 2 && relPosition.top < $(window).height() / 2) { // top left quad
      this.setState({
        popupPosition: {
          left: absPosition.left + relPosition.width,
          top: absPosition.top,
          right: absPosition.left + relPosition.width * 2,
          bottom: absPosition.top + relPosition.height,
          width: relPosition.width * 2,
          height: relPosition.height * 3,
        },
      });
    } else if (absPosition.left > $(window).width() / 2 && relPosition.top < $(window).height() / 2) { // top right quad
      this.setState({
        popupPosition: {
          left: absPosition.left - relPosition.width * 2,
          top: absPosition.top,
          right: absPosition.left,
          bottom: absPosition.top + relPosition.height,
          width: relPosition.width * 2,
          height: relPosition.height * 3,
        },
      });
    } else if (absPosition.left < $(window).width() / 2 && relPosition.top > $(window).height() / 2) { // bottom left quad
      this.setState({
        popupPosition: {
          left: absPosition.left + relPosition.width,
          top: absPosition.top - relPosition.height * 2.5,
          right: absPosition.left + relPosition.width * 2,
          bottom: absPosition.top - relPosition.height * 1.5,
          width: relPosition.width * 2,
          height: relPosition.height * 3,
        },
      });
    } else {
      this.setState({
        popupPosition: {
          left: absPosition.left - relPosition.width * 2,
          top: absPosition.top - relPosition.height * 2.5,
          right: absPosition.left,
          bottom: absPosition.top - relPosition.height * 1.5,
          width: relPosition.width * 2,
          height: relPosition.height * 3,
        },
      });
    }

    this.togglePopup();
  }

  // Called before the Schedule is Rendered
  componentWillMount() {
    // Remove unnecessary styling
    $('#body').removeClass('loginBody');
    $('.button').hide();
  }

  render() {
    const MONTH_QUERY = gql`{
      getMonth(year: ${SchedulePage.getCurrentDateTime().getFullYear()}, month: ${SchedulePage.getCurrentDateTime().getMonth() + 1}) {
        monthNum,
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
        <div id="calendarContainer">

          {/* Render Month Heading */}
          <div className="month">
            <div>
              <div className="prevMonth">&#10094;</div>
              <div className="nextMonth">&#10095;</div>
              <div>
                <div>
                  {SchedulePage.getCurrentDateTime().toLocaleString('default', { month: 'long' })} <br/>
                  <span style={{"fontSize":18}}>{SchedulePage.getCurrentDateTime().getFullYear()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Render weekday Headings */}
          <div className="weekdays" style={{gridArea: "4 / 1 / 5 / 2"}}>Sun</div>
          <div className="weekdays" style={{gridArea: "4 / 2 / 5 / 3"}}>Mon</div>
          <div className="weekdays" style={{gridArea: "4 / 3 / 5 / 4"}}>Tue</div>
          <div className="weekdays" style={{gridArea: "4 / 4 / 5 / 5"}}>Wed</div>
          <div className="weekdays" style={{gridArea: "4 / 5 / 5 / 6"}}>Thu</div>
          <div className="weekdays" style={{gridArea: "4 / 6 / 5 / 7"}}>Fri</div>
          <div className="weekdays" style={{gridArea: "4 / 7 / 5 / 8"}}>Sat</div>

          {/* Iterate through the current textareaArray state to create the days */}
          <Query query={MONTH_QUERY}>
            {
              (result) => {
                if ($.isEmptyObject(result.data)) {
                  return null;
                } else {
                  let rowCounter = 4;
                  let colCounter = 0;
                  return (
                    result.data.getMonth.days.map((day, index) => {
                      colCounter++;
                      if (index % 7 === 0) {
                        rowCounter++;
                        colCounter = 1;
                      }
                      let curDate = new Date(day.date.toString()+"T12:00:00Z");
                      let dayActiveClass = result.data.getMonth.monthNum - 1 !==  curDate.getMonth() ? "inactive" : "";
                      return(
                        <div key={day.date} className={`days ${dayActiveClass}`} style={{gridArea: `${rowCounter} / ${colCounter} / ${rowCounter+1} / ${colCounter+1}`}} onClick={this.onDateClick}>
                          <span>{curDate.getDate()}</span>
                        </div>
                      );
                    })
                  )
                }
              }
            }
          </Query>

        </div>

        { this.state.showEventPopup ? <EventPopup position={this.state.popupPosition} closePopup={this.togglePopup}/> : null }

      </div>
    );
  }
}
