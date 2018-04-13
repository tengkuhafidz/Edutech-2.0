import axios from 'axios';

const findUserGroups = async username => axios.get(`/group/user/${username}`);

const getMembersWithoutGroup = async assignmentId => axios.get(`/group/memberswithoutgroup/${assignmentId}`);

const autoAssignMembers = async assignmentId => axios.put(`/group/autoAssign/${assignmentId}`);

export { findUserGroups, getMembersWithoutGroup, autoAssignMembers }; // eslint-disable-line
