import axios from 'axios';

const findUserGroups = async username => axios.get(`/group/user/${username}`);

const getMembersWithoutGroup = async assignmentId => axios.get(`/group/memberswithoutgroup/${assignmentId}`);

export { findUserGroups, getMembersWithoutGroup }; // eslint-disable-line
