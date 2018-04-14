import React, { Component } from 'react';

import GroupScheduleItemStore from '../../stores/ScheduleItemStore/GroupScheduleItemStore';
import GroupStore from '../../stores/GroupStore/GroupStore';
import { Grid, Row, Col } from 'react-bootstrap';

import Chatroom from './Chatroom';
import Whiteboard from './Whiteboard';
import './styles.css';

export default class CollabScene extends Component {
  componentWillMount() {

  }
  render() {
    return (
      <div className="collabScene">
          <Row>
            <Col md={1} className="leftMostSection collabMembers">
              <h5>Online</h5>
            </Col>
            <Col md={4} className="section collabChat">
              <Chatroom />
            </Col>
            <Col md={7} className="section collabDraw">
              <Whiteboard />
            </Col>
          </Row>
      </div>
    );
  }
}
