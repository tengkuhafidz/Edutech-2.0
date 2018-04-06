import React, { Component } from 'react';
import { Paper } from 'material-ui';
import { Tabs, Tab, Col, Row, Button, FormControl } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { DateTimePicker, DropdownList } from 'react-widgets';
import momentLocalizer from 'react-widgets-moment';
import moment from 'moment';
import swal from 'sweetalert';

import 'react-widgets/dist/css/react-widgets.css';

import SingleGroupTask from './SingleGroupTask';
import GroupTaskStore from '../../../stores/TaskStore/GroupTaskStore';
import GroupStore from '../../../stores/GroupStore/GroupStore';
// create a viewModel singleton
const groupTaskStore = new GroupTaskStore();
// setup react-widgets moment localisation
moment.locale('en');
momentLocalizer();

@observer
export default class GroupTask extends Component {
  state = {
    taskTitle: null,
    taskDate: null,
    taskAssignee: null,
  }

  componentDidMount() {
    groupTaskStore.groupId = this.props.groupId;
    groupTaskStore.fetchGroupTasks(groupTaskStore.groupId);
  }

  addTask(e) {
    if (e.target.value && e.which === 13) {
      groupTaskStore.addTask(e.target.value);
      e.target.value = '';
    }
  }

  handleEnterPress(e) {
    if (e.which === 13) {
      this.addGroupTask();
    }
  }

  addGroupTask() {
    if (this.state.taskTitle) {
      // console.log("PRESSED")

      groupTaskStore.addGroupTask(
        this.state.taskTitle,
        moment(this.state.taskDate).format('YYYY-MM-DDTHH:mm:ss'),
        this.state.taskAssignee,
        this.props.groupId,
      );

      this.setState({
        taskTitle: '',
        taskAssignee: null,
        taskDate: null,
      });
    } else {
      swal("Ooops!", "Task name cannot be empty", "error");
    }
  }

  getGroupMemberNames() {
    const group = GroupStore.selectedGroup;
    const { members } = group;
    const membersNames = members.map(member => member.username);
    return membersNames;
  }

  renderCurrentGroupTasks() {
    return groupTaskStore.currentTasks.map(task =>
      <SingleGroupTask key={task.id} task={task} groupTaskStore={groupTaskStore} groupMemberNames={this.getGroupMemberNames()} />);
  }

  renderCompletedGroupTasks() {
    return groupTaskStore.completedTasks.map(task =>
      <SingleGroupTask key={task.id} task={task} groupTaskStore={groupTaskStore} />);
  }

  renderTaskInput() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <FormControl
              type="text"
              placeholder="Add group task"
              onKeyPress={e => this.handleEnterPress(e)}
              value={this.state.taskTitle}
              onChange={e => this.setState({ taskTitle: e.target.value })}
            />
          </Col>
        </Row>
        <Row className="smallTopGap">
          <Col md={6}>
            <DropdownList
              data={this.getGroupMemberNames()}
              placeholder="Assign a member"
              onChange={assignedTo => this.setState({ taskAssignee: assignedTo })}
              value={this.state.taskAssignee}
            />
          </Col>
          <Col md={6}>
            <DateTimePicker
              time={false}
              min={new Date()}
              placeholder="Set deadline"
              onChange={selectedDate => this.setState({ taskDate: selectedDate })}
              value={this.state.taskDate}
            />
          </Col>
        </Row>
        <Row className="smallTopGap">
          <Col md={12}>
            <Button bsStyle="primary" className="pull-right" onClick={() => this.addGroupTask()}>
              Add Task
            </Button>
          </Col>
        </Row>
      </div>
    );
  }

  render() {
    return (
      <Paper className="standardTopGap paperDefault">
        { this.renderTaskInput() }
        <div className="pull-right standardTopGap">
          <Button bsStyle="link" onClick={() => groupTaskStore.fetchGroupTasks(this.props.groupId)}>Refresh</Button>
        </div>
        <Tabs defaultActiveKey={1} className="standardTopGap">
          <Tab eventKey={1} title="Current">
            <div className="taskList">
              { this.renderCurrentGroupTasks() }
            </div>
          </Tab>
          <Tab eventKey={2} title="Completed">
            <div className="taskList">
              { this.renderCompletedGroupTasks() }
            </div>
          </Tab>
        </Tabs>
      </Paper>
    );
  }
}
