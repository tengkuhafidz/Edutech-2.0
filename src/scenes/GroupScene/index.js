import React, { Component } from 'react';
import { Tabs, Tab, Paper, Divider } from 'material-ui';
import { observer } from 'mobx-react';
import { Animated } from 'react-animated-css';
import { Wave } from 'better-react-spinkit';
import { Row, Col } from 'react-bootstrap';


import GroupStore from '../../stores/GroupStore/GroupStore';
import GroupScheduleItemStore from '../../stores/ScheduleItemStore/GroupScheduleItemStore';

import Feed from '../../components/Feed';
import GroupMeeting from './GroupMeeting';
import MergeCalendar from './GroupMeeting/MergeCalendar';
import GroupBrainstorm from './GroupBrainstorm';
import GroupCalendar from './GroupCalendar';
import GroupScheduleItemsChart from './GroupScheduleItemsChart';
import GroupTask from './GroupTask';
import GroupTaskStore from '../../stores/TaskStore/GroupTaskStore';

import './styles.css';


@observer
export default class GroupScene extends Component {
  async componentDidMount() {
    const { groupId } = this.props.match.params;
    await GroupStore.setSelectedGroup(groupId);
    await GroupTaskStore.fetchGroupTasks(groupId);
    await GroupScheduleItemStore.populateGroupScheduleItems(groupId);
  }
  async componentWillReceiveProps(newProps) {
    const { groupId } = newProps.match.params;
    await GroupStore.setSelectedGroup(groupId);
    await GroupTaskStore.fetchGroupTasks(groupId);
    await GroupScheduleItemStore.populateGroupScheduleItems(groupId);
  }
  render() {
    const { groupId } = this.props.match.params;
    if (!GroupStore.donePopulating || !GroupTaskStore.donePopulating
        || !GroupScheduleItemStore.donePopulating) {
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
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible={groupId}>
        <Row>
          <Col md={8}>
            <Paper className="animated fadeIn">
              <Tabs>
                <Tab label="Conversations" >
                  <div className="tabContent">
                    <Feed pageId={groupId} scene="group" />
                  </div>
                </Tab>
                <Tab label="Meetings">
                  <div className="tabContent">
                    <GroupMeeting groupId={groupId} />
                  </div>
                </Tab>
                <Tab label="Tasks">
                  <div className="tabContent">
                    <GroupTask groupId={groupId} selectedGroup={GroupStore.selectedGroup} />
                  </div>
                </Tab>
                <Tab label="Schedule">
                  <div className="tabContent">
                    <GroupCalendar groupId={groupId} viewChart />
                  </div>
                </Tab>
              </Tabs>
            </Paper>
          </Col>
          <Col md={4}>
            <Paper className="sideSection">
              <Row>
                <h3> Group Objective </h3>
                <p> {GroupStore.selectedGroup.description} </p>
              </Row>
              <Divider />
              <Row className="">
                <h3>Upcoming Meeting</h3>
              </Row>
              <Divider />
              <Row className="sideSectionItem">
                <h1 className="statNumberTask"> {GroupTaskStore.taskDeadlineInAWeek.length} </h1>
                <p className="lead">deadline in 7 days</p>
              </Row>
            </Paper>
          </Col>
        </Row>
      </Animated>
    );
  }
}
