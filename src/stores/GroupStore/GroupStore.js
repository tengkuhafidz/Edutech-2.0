import { observable, action, runInAction, computed } from 'mobx';
import axios from 'axios';
import swal from 'sweetalert';

import UtilStore from '../UtilStore/UtilStore';
import AssignmentStore from '../ModuleStore/AssignmentStore';
import { findUserGroups, autoAssignMembers } from '../../services/groupApi';

class GroupStore {
  @observable groupList = [];
  @observable donePopulating = false;
  @observable selectedGroup;

  async populateGroupList(username) {
    const groups = await findUserGroups(username);
    runInAction(() => {
      this.groupList = groups.data;
      this.donePopulating = true;
    });
  }

  @action
  async doAutoAssignMembers(assignmentId, moduleCode) {
    console.log('autoAssign members in ', assignmentId)
    try {
      const res = await autoAssignMembers(assignmentId);
      console.log('res data auto assign: ', res.data);
      AssignmentStore.populateModuleAssignments(moduleCode)
      // this.groupList = res.data;
      // this.donePopulating = true;
    } catch(e) {
      console.log(e);
    }
  }

	@action
	getGroup(groupId) {
		this.selectedGroup = this.groupList.find(group => group.id === parseInt(groupId, 10));
		return this.selectedGroup;
	}

  @action
  setSelectedGroup(groupId) {
    this.selectedGroup = this.groupList.find(group => group.id === parseInt(groupId, 10));
  }

  @computed
  get students() {
    return this.selectedGroup.members.filter(member => member.userType === 'student');
  }

  @computed
  get instructors() {
    return this.selectedGroup.members.filter(member => member.userType === 'instructor');
  }

  @action
  async editGroupDescription(newDescription) {
    console.log('editGroupDescription newDescription', newDescription, 'this.selectedGroup', this.selectedGroup)
    try {
      this.selectedGroup.description = newDescription;
      console.log('this.selectedGroup.descripton ', this.selectedGroup.description)
      await axios.put(`/group/${this.selectedGroup.id}`, this.selectedGroup);
      UtilStore.openSnackbar('Group decription updated')
    } catch (e) {
      swal('Error', 'Error updating group description', 'error')
    }
  }
}

export default new GroupStore();
