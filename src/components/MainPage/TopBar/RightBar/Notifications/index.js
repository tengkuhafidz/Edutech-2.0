import React, { Component } from 'react';
import { Wave } from 'better-react-spinkit';

import AnnouncementStore from '../../../../../stores/AnnouncementStore/AnnouncementStore';

export default class Notifications extends Component {
  componentWillMount() {
    AnnouncementStore.populateAnnouncements(localStorage.getItem('username'));
  }
  render() {
    if (!AnnouncementStore.donePopulating) {
        return (
          <div className="fakeBody">
            <div className="initialSpinner">
              <center>
                <Wave size={100} />
                <span className="spinnerText">Loading...</span>
              </center>
            </div>
          </div>
        );
      }
    return (
      <div>
        <h3>Notifications</h3>
        <p>{AnnouncementStore.announcements.length}</p>
      </div>
    );
  }
}
