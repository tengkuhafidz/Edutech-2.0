import React, { Component } from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import {Button ,Glyphicon, Modal} from 'react-bootstrap';

import CreateAssignmentForm from './CreateAssignmentForm';
// import CreateAssessmentForm from '../RightPanel/CreateAssessmentForm';
import AssignmentListView from './AssignmentListView';

import AssignmentStore from '../../../stores/ModuleStore/AssignmentStore';
import ModuleStore from '../../../stores/ModuleStore/ModuleStore';

@observer
class Assignment extends Component {

	constructor() {
		super()
		this.state = {
			showAssignmentForm: false,
		}
	}

	flipShowAssignmentFormState() {
		this.setState({ showAssignmentForm: !this.state.showAssignmentForm })
	}

	renderCreateButton(assignmentList) {
	    return (
	      <div>
	        <Button bsStyle="primary" onClick={this.flipShowAssignmentFormState.bind(this)}>
	          Create Assignment
	          <Glyphicon glyph="plus" style={{marginLeft: '5px'}}/>
	        </Button>
					<AssignmentListView assignmentList={assignmentList}/>
	      </div>
	      )
	 }


	render() {
		const { selectedModule } = ModuleStore;
		const assignmentList = toJS(AssignmentStore.assignmentList);

		return(
			<div className="standardTopGap">
				{
					this.state.showAssignmentForm ?
					<CreateAssignmentForm
					  moduleCode={this.props.moduleCode}
					  selectedModule={selectedModule}
					  flipShowAssignmentFormState={this.flipShowAssignmentFormState.bind(this)}
					/>
					: this.renderCreateButton(assignmentList)
				}

			</div>
		)
	}
}

export default Assignment;
