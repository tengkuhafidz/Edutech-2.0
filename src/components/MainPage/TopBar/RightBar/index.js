import React, { Component } from 'react';
import { Drawer, Tabs, Tab } from 'material-ui';

import KeyDates from './KeyDates';
import './styles.css';

/*eslint-disable */
export default class RightBar extends Component {
  render() {
    const { openRightBar, handleToggleRightBar } = this.props;
    return (
      <Drawer
        docked={false}
        width={300}
        open={openRightBar}
        openSecondary={true}
        onRequestChange={() => handleToggleRightBar()}

      >
      <Tabs>
        <Tab label="Key Dates">
          <KeyDates/>
        </Tab>
        <Tab label="Notifications">
          <div>
            <h2>Notifications</h2>
            <p>
              This is another example tab.
            </p>
          </div>
        </Tab>
      </Tabs>
      </Drawer>
    );
  }
}
