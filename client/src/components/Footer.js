import React, {Component} from 'react';
import './stylesheets/Footer.css';

// Component to render footer
export class Footer extends Component {
  render() {
    return (
      <div className = "footer">
          <div className = "footerText">
              1070 Townline Road, Cambridge, Ontario <br/>
              (519) 658-1070
          </div>
      </div>
    );
  }
}
