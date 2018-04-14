import { observable, action } from 'mobx';
import Assignment from './Assignment.js';
import { fetchModuleAssignment, createGroupAssignment, createIndividualAssignment, deleteAssignment,
joinAssignmentGroup, leaveAssignmentGroup } from '../../services/assignmentApi';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
import swal from 'sweetalert';
import UtilStore from '../UtilStore/UtilStore';

import GroupStore from '../GroupStore/GroupStore';
import ModuleStore from '../ModuleStore/ModuleStore';
import AnnouncementStore from '../AnnouncementStore/AnnouncementStore';


class AssignmentStore {
	@observable assignmentList = [];

	@action
	async createAssignment(openDate, closeDate, username, moduleCode, title, numberOfStudents, groupSize, type) {
		const createdBy = { username };
		const module = { moduleCode };
		openDate = moment(openDate).format('YYYY-MM-DDTHH:mm:ss');
		closeDate = moment(closeDate).format('YYYY-MM-DDTHH:mm:ss');
		const dataSet = new Assignment(title, openDate, closeDate, [], module, createdBy, [], []);

		if (type === 'individual') {
			try {
				const assignmentItem = await createIndividualAssignment(dataSet)
				AnnouncementStore.postAnnouncement(
					ModuleStore.selectedModule.moduleCode,
					`Individual Assignment: ${title} published`,
					 ModuleStore.selectedModule.members,
					 `module/${ModuleStore.selectedModule.moduleCode}?tabKey/Assignments`,
				);
				UtilStore.openSnackbar("Individual Assignment created successfully");
				this.populateModuleAssignments(moduleCode);
			} catch (e) {
				swal('Error!','Unable to create individual assignment', 'error')
			}
		} else {
			let numOfGroups = numberOfStudents / groupSize;
			numOfGroups = _.ceil(numOfGroups);
			try {
				const assignmentItem = await createGroupAssignment(numOfGroups, groupSize, dataSet)
				console.log('assignment item: ', assignmentItem.data);
				this.populateModuleAssignments(moduleCode);
				UtilStore.openSnackbar("Group Assignment created successfully");
				AnnouncementStore.postAnnouncement(
					ModuleStore.selectedModule.moduleCode,
					`Group Assignment: ${title} published`,
					 ModuleStore.selectedModule.members,
					 `/module/${ModuleStore.selectedModule.moduleCode}`,
				);
			} catch (e) {
				swal('Error!', 'Unable to create group assignment', 'error')
			}
		}
	}

	@action
	async deleteAssignment(assignmentId) {
		try {
			const remainingAssignments = await deleteAssignment(assignmentId);
			console.log('reamining assignments: ', remainingAssignments.data)
			this.assignmentList = remainingAssignments.data;
			UtilStore.openSnackbar('Assignment deleted successfully');
		} catch (e) {
			swal('Network Error!', 'Unable to delete assignment.', 'error')
		}
	}

	@action
	populateModuleAssignments(moduleCode) {
		axios.get(`/assignment/module/${moduleCode}`)
		.then((res) => {
			console.log("assignmentList store", res.data);
			this.assignmentList = res.data
		})
		.catch((err) => {
			console.log(err)
		})
	}

	@action
	joinAssignmentGroup(username, groupId, assignmentId, moduleCode) {
		axios.put(`/group/join/${groupId}/${username}`)
		.then((res) => {
			const joinedGroup = res.data;
			console.log("res data: ", joinedGroup)
			this.populateModuleAssignments(moduleCode);
			GroupStore.populateGroupList(username);
		})
		.catch((err) => {
			console.log(err)
		})
	}

	@action
	leaveAssignmentGroup(username, groupId, assignmentId, moduleCode) {
		axios.put(`/group/leave/${groupId}/${username}`)
		.then((res) => {
			const leaveGroup = res.data;
			console.log("res data: ", leaveGroup);
			this.populateModuleAssignments(moduleCode);
			GroupStore.populateGroupList(username);
		})
		.catch((err) => {
			console.log(err)
		})
	}

}

export default new AssignmentStore;
