import React, {Component} from 'react';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import {Button ,Glyphicon, Modal} from 'react-bootstrap';

import CreateAssignmentForm from './CreateAssignmentForm';
import CreateAssessmentForm from './CreateAssessmentForm';
import AssignmentListView from './AssignmentListView';

import AssignmentStore from '../../../stores/ModuleStore/AssignmentStore';
import ModuleStore from '../../../stores/ModuleStore/ModuleStore';

@observer
class Assignment extends Component {

	constructor(){
		super()
		this.state = {
			openAssessmentForm: false,
			showAssignmentForm: false
		}
	}

	flipShowAssignmentFormState(){
		this.setState({showAssignmentForm: !this.state.showAssignmentForm})
	}

	flipShowAssessmentFormState(){
		this.setState({openAssessmentForm: !this.state.openAssessmentForm})
	}


	renderCreateButton(assignmentList){

	    return (
	      <div>
	        <Button bsStyle="primary" onClick ={this.flipShowAssignmentFormState.bind(this)}>
	          Create Assignment
	          <Glyphicon glyph="plus" style={{marginLeft: '5px'}}/>
	        </Button>
	        &nbsp;
	        <Button bsStyle="primary" onClick ={this.flipShowAssessmentFormState.bind(this)}>
	          Create Assessment
	          <Glyphicon glyph="plus" style={{marginLeft: '5px'}}/>
	        </Button>
	      </div>
	      )
	 }


	render(){
		const selectedModule = ModuleStore.selectedModule;
		const assignmentList = toJS(AssignmentStore.assignmentList);

		return(
			<div className="standardTopGap">
				{
					this.state.showAssignmentForm ?
					<CreateAssignmentForm moduleCode={this.props.moduleCode} selectedModule={selectedModule} flipShowAssignmentFormState={this.flipShowAssignmentFormState.bind(this)}/>
					: this.renderCreateButton(assignmentList)
				}

				<Modal show={this.state.openAssessmentForm} onHide={this.flipShowAssessmentFormState.bind(this)}>
		          <Modal.Header closeButton>
		            <Modal.Title>Add Assessment Item </Modal.Title>
		          </Modal.Header>
		          <CreateAssessmentForm handleClose={this.flipShowAssessmentFormState.bind(this)} />
		        </Modal>

			</div>
		)
	}
}

export default Assignment;
