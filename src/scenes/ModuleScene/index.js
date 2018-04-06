import React, { Component } from 'react';
import { Tabs, Tab, Paper } from 'material-ui';
import { observer } from 'mobx-react';
import { Animated } from 'react-animated-css';

import Lesson from './Lesson';
import Assignment from './Assignment';
import GroupingInstructor from './GroupingInstructor';
import GroupingStudent from './GroupingStudent';

import LessonStore from '../../stores/LessonStore/LessonStore';
import ModuleStore from '../../stores/ModuleStore/ModuleStore';
import AssignmentStore from '../../stores/ModuleStore/AssignmentStore';

import Feed from '../../components/Feed';

@observer
export default class ModuleScene extends Component {
  componentDidMount() {
    const { moduleCode } = this.props.match.params;
    LessonStore.getLessonsForModule(moduleCode);
    // GroupStore.populateModuleGroup(moduleCode);
    AssignmentStore.populateModuleAssignments(moduleCode);
  }

  componentWillReceiveProps(newProps) {
    const { moduleCode } = newProps.match.params;
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
      </Animated>
    );
  }
}
