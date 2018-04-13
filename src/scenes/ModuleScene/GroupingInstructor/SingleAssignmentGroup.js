import React, { Component } from 'react';
import { Label, Row, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import GroupingListInstructor from './GroupingListInstructor';
import AssignmentStore from '../../../stores/ModuleStore/AssignmentStore';

@observer
class SingleAssignmentGroup extends Component {
	constructor() {
		super();
		this.state = {
			openDialog: false,
		}
	}
	getMembersWithoutGroup() {
		const { id } = this.props.assignment;
		this.setState({ openDialog: true })
		AssignmentStore.getMembersWithoutGroup(id);
	}
	handleCloseDialog() {
    this.setState({ openDialog: false });
  }
	renderViewMembersWithtouGroupBtn() {
		return (<Button bsStyle="primary" onClick={() => this.getMembersWithoutGroup()}>View Members Without Group</Button>)
	}
	renderMembersWithoutGroupDialog() {
		const { membersWithoutGroup } = AssignmentStore;
		console.log('membersWithoutGroup: ', membersWithoutGroup);
		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={() => this.handleCloseDialog()}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
      />,
    ];
		return (
			<Dialog
        title="Dialog With Actions"
        actions={actions}
        modal={true}
        open={this.state.openDialog}
        onRequestClose={() => this.handleCloseDialog()}
      >
				<h4>Members Without Group</h4>
				<ul>
				{
					(membersWithoutGroup && membersWithoutGroup.length > 0) ?
					(membersWithoutGroup.map(member => (<li>{member.username}</li>))) : <p>Loading . . .</p>
				}
				</ul>
      </Dialog>
		)
	}
	render() {
		const { assignment } = this.props;
		const moduleGrouping = assignment.groups;
		return (
			<div>
				<h3>
			    	{assignment.title} {this.renderViewMembersWithtouGroupBtn()}
			    	<h5><Label bsStyle="default">Max Group Size: {moduleGrouping[0].groupSize}</Label></h5>
				</h3>
				<Row>
					{
						(moduleGrouping.length > 0) ? (
							moduleGrouping.map(group =>
								(<GroupingListInstructor
									key={group.id}
									group={group}
									assignmentId={assignment.id}
								/>)
							)
							)
						: ''
					}
				</Row>
				<hr />
				{this.renderMembersWithoutGroupDialog()}
			</div>
		)
	}
}

export default SingleAssignmentGroup;
