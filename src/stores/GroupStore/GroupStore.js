import { observable, action, runInAction } from 'mobx';

import { findUserGroups } from '../../services/groupApi';

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
	getGroup(groupId) {
		this.selectedGroup = this.groupList.find(group => group.id === parseInt(groupId, 10));
		return this.selectedGroup;
	}

  @action
  setSelectedGroup(groupId) {
    this.selectedGroup = this.groupList.find(group => group.id === parseInt(groupId, 10));
  }
}

export default new GroupStore();
