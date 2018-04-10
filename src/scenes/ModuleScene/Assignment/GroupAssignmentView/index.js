import React, { Component } from 'react';
import { Button, FormGroup, ListGroup, ListGroupItem, ControlLabel, FormControl } from 'react-bootstrap';
import moment from 'moment';
import swal from 'sweetalert';

import AssignmentStore from '../../../../stores/ModuleStore/AssignmentStore';

function FieldGroup({ id, label, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

class GroupAssignmentView extends Component {

  constructor() {
    super()
    this.state = {
      file: null,
    }
  }

onSubmit(event) {
  event.preventDefault();
  const { id } = this.props.assignment;
  const selectedFile = this.state.file;
  console.log('selected File:', selectedFile);
  const username = localStorage.getItem('username');
  const title = ''
  if (selectedFile && selectedFile.size > 10000000) {
    swal('File Size Error!', 'Your file size is more than 10MB.', 'error');
  } else if (selectedFile) {
    AssignmentStore.submitAssignment(id, selectedFile, username, title);
  }
}

  handleChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  renderSubmissions(assignment) {
    if (assignment.submissions.length > 0) {
      return assignment.submissions.map(item => (
        <ListGroupItem bsStyle="warning">
          {item.fileName}
        </ListGroupItem>
      ))
    }
    return (<h4 style={{ textColor: 'blue' }}>You have no submission.</h4>)
  }
  render() {
    const { assignment } = this.props;
		const deadlineDate = moment(assignment.closeDate).format('dddd, Do MMMM');
		const deadlineTime = moment(assignment.closeDate).format('h:mm a');
    return (
      <div>
				<h3 style={{ fontWeight: '150' }}>
				  Deadline: {deadlineDate}, {deadlineTime}
				</h3>

				<form onSubmit={() => this.onSubmit()}>
			        <FormGroup>
			          	<FieldGroup
	                  type="file"
	                  label="File"
					          onChange={ () => this.handleChange() }
					       />
						<Button className="standardTopGap" type="submit" bsStyle="primary" block>Upload Attachment</Button>
			        </FormGroup>
	   </form>
			    <ListGroup>
			    	{this.renderSubmissions(assignment)}
  	    </ListGroup>
			</div>
    );
  }
}

export default GroupAssignmentView;
