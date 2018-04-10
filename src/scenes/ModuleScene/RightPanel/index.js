import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Row, Button } from 'react-bootstrap';
import { Paper, Divider } from 'material-ui';
import moment from 'moment';
import './styles.css';

import AddAssessmentDialog from './AddAssessmentDialog';
import AssessmentListView from './AssessmentListView';
import ModuleStore from '../../../stores/ModuleStore/ModuleStore';
import ScheduleItemStore from '../../../stores/ScheduleItemStore/ScheduleItemStore';

@observer
class RightPanel extends Component {
  constructor() {
    super();
    this.state = {
      assessmentDialogState: false,
      startDate: new Date(),
      endDate: new Date(),
      title: '',
      description: '',
      location: '',
    }
  }
  handleCloseAssessmentForm() {
    this.setState({
      assessmentDialogState: false,
      title: '',
      description: '',
      location: '',
    });
  }
  handleAddAssessment(moduleCode) {
    const {
      title, description, startDate, endDate, location,
    } = this.state;
    const assignedTo = [];
    const itemType = 'assessment';
    const groupId = null;
    ScheduleItemStore.addScheduleItem(
        title, description, startDate,
        endDate, location, assignedTo, itemType, moduleCode, groupId,
      );
    this.handleCloseAssessmentForm();
  }
  openAssessmentDialog() {
    this.setState({
      assessmentDialogState: true,
      startDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      endDate: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    })
  }
  renderAddAssessmentDialog(moduleCode) {
    return (
      <AddAssessmentDialog
        handleTitleChange={e => this.setState({ title: e.target.value })}
        handleDescriptionChange={e => this.setState({ description: e.target.value })}
        handleLocationChange={venue => this.setState({ location: venue })}
        handleStartChange={start => this.setState({ startDate: start })}
        handleEndChange={end => this.setState({ endDate: end })}
        handleCloseAssessmentForm={() => this.handleCloseAssessmentForm()}
        handleAddAssessment={() => this.handleAddAssessment(moduleCode)}
        dialogState={this.state.assessmentDialogState}
        scheduleStart={this.state.startDate}
        scheduleEnd={this.state.endDate}
        scheduleLocation={this.state.location}
        scheduleTitle={this.state.title}
        scheduleDescription={this.state.description}
      />
    )
  }
  renderCreateAssessmentBtn(userType) {
    if (userType === 'instructor') {
      return (<Button className="standardTopGap" bsStyle="primary" block onClick={() => this.openAssessmentDialog()}>Add Assessment</Button>)
    }
    return '';
  }
  render() {
    const module = ModuleStore.getModule(this.props.moduleCode);
    const userType = localStorage.getItem('userType');
    const { moduleCode, title } = module;
    return (
            <Paper className="moduleInfo">
              <Row>
                <h1> {moduleCode} </h1>
                <p className="lead">{title}</p>
              </Row>
              <Divider />
              <Row className="taskChartItem">
              <AssessmentListView moduleCode={moduleCode} />
              {this.renderCreateAssessmentBtn(userType)}
              {this.renderAddAssessmentDialog(moduleCode)}
              </Row>
            </Paper>
    );
  }
}
export default RightPanel;
