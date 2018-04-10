import React, { Component } from 'react';
import { Tabs, Tab, Paper, FlatButton, List, ListItem, Avatar, Dialog, Subheader } from 'material-ui';
import { Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { Animated } from 'react-animated-css';

import Lesson from './Lesson';
import Assignment from './Assignment';
import GroupingInstructor from './GroupingInstructor';
import GroupingStudent from './GroupingStudent';
import RightPanel from './RightPanel';

import LessonStore from '../../stores/LessonStore/LessonStore';
import ModuleStore from '../../stores/ModuleStore/ModuleStore';
import AssignmentStore from '../../stores/ModuleStore/AssignmentStore';
import {USER_IMAGE_PATH} from '../../utils/constants';


import Feed from '../../components/Feed';

@observer
export default class ModuleScene extends Component {
  componentDidMount() {
    const { moduleCode } = this.props.match.params;
    ModuleStore.setSelectedModule(moduleCode);
    LessonStore.getLessonsForModule(moduleCode);
    // GroupStore.populateModuleGroup(moduleCode);
    AssignmentStore.populateModuleAssignments(moduleCode);
  }

  componentWillReceiveProps(newProps) {
    const { moduleCode } = newProps.match.params;
    ModuleStore.setSelectedModule(moduleCode);
    LessonStore.getLessonsForModule(moduleCode);
    AssignmentStore.populateModuleAssignments(moduleCode);
    // GroupStore.populateModuleGroup(moduleCode);
  }
  renderGroupingPage() {
    return localStorage.getItem('userType') === 'student' ? <GroupingStudent /> : <GroupingInstructor />;
  }

  render() {
    const { moduleCode } = this.props.match.params;
    let module = null;
    let moduleTitle = null;
    if (ModuleStore.moduleList.length > 0) {
      module = ModuleStore.getModule(moduleCode);
      moduleTitle = module.title;
    }
    return (
      <Animated animationIn="fadeIn" animationOut="fadeOut" isVisible>
        <Row>
          <Col md={8}>
          <Paper>
            <Tabs>
              <Tab label="Conversations" >
                <div className="tabContent">
                  <Feed pageId={moduleCode} scene="module" />
                </div>
              </Tab>
              <Tab label="Lessons">
                <div className="tabContent">
                  <Lesson />
                </div>
              </Tab>
              <Tab label="Assignment" >
                <div className="tabContent">
                  <Assignment moduleCode={moduleCode} />
                </div>
              </Tab>
              <Tab label="Grouping " >
                <div className="tabContent">
                  {this.renderGroupingPage()}
                </div>
              </Tab>
            </Tabs>
          </Paper>
          </Col>
          <Col md={4}>
            <RightPanel moduleCode={moduleCode} />
          </Col>
        </Row>
      </Animated>
    );
  }
}
