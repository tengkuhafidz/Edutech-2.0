import React, { Component } from 'react';
import { Tabs, Tab, Paper } from 'material-ui';
import { observer } from 'mobx-react';
import { Animated } from 'react-animated-css';

import GroupStore from '../../stores/GroupStore/GroupStore';
import ScheduleItemStore from '../../stores/ScheduleItemStore/ScheduleItemStore';

import Feed from '../../components/Feed';
import GroupMeeting from './GroupMeeting';
import MergeCalendar from './GroupMeeting/MergeCalendar';
import GroupBrainstorm from './GroupBrainstorm';
import GroupTask from './GroupTask';


export default class GroupScene extends Component {
  async componentDidMount() {
    const { groupId } = this.props.match.params;
    await ScheduleItemStore.populateMergedScheduleItemsForGroup(groupId);
  }
  render() {
    const { groupId } = this.props.match.params;
    let group = null;
    let groupTitle = null; // eslint-disable-line
    if (GroupStore.groupList.length > 0) {
      group = GroupStore.getGroup(groupId);
      groupTitle = group.title;
    }
    return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={groupId}>
        <Paper className="animated fadeIn">
          <Tabs>
            <Tab label="Conversations" >
              <div className="tabContent">
                <Feed pageId={groupId} scene="group" />
              </div>
            </Tab>
            <Tab label="Meetings">
              <div className="tabContent">
                <h2>{groupId}</h2>
                <GroupMeeting groupId={groupId} />
              </div>
            </Tab>
            <Tab label="Tasks">
              <div className="tabContent">
                <GroupTask groupId={groupId} selectedGroup={GroupStore.selectedGroup} />
              </div>
            </Tab>
            <Tab label="Calendar">
              <div className="tabContent">
                <h2>{groupId}</h2>
                <MergeCalendar groupId={groupId} />
              </div>
            </Tab>
            <Tab label="Brainstorm">
              <div className="tabContent">
                <GroupBrainstorm groupId={groupId} />
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </Animated>
    );
  }
};
