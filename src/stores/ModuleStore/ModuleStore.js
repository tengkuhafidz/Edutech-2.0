import { observable, action, runInAction } from 'mobx';

import { findUserModules } from '../../services/moduleApi';


class ModuleStore {
	@observable moduleList = [];
	@observable donePopulating = false;
	@observable selectedModule;

	async populateModuleList(username) {
		const modules = await findUserModules(username);
		runInAction(() => {
			this.moduleList = modules.data;
			this.donePopulating = true;
		});
	}

	@action
	getModule(moduleCode) {
		this.selectedModule = this.moduleList.find(module => module.moduleCode === moduleCode);
		return this.selectedModule;
	}
}

export default new ModuleStore();
