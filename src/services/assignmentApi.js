import axios from 'axios';

const fetchModuleAssignment = async moduleCode => axios.get(`/assignment/module/${moduleCode}`)

const createGroupAssignment = async (numOfGroups, groupSize, dataSet) => axios.post(`/assignment/group/${numOfGroups}/${groupSize}`, dataSet)

const createIndividualAssignment = async dataSet => axios.post('/assignment/individual', dataSet)

const deleteAssignment = async assignmentId => axios.delete(`/assignment/${assignmentId}`)

const joinAssignmentGroup = async (groupId, username) => axios.put(`/group/join/${groupId}/${username}`)

const leaveAssignmentGroup = async (groupId, username) => axios.put(`/group/leave/${groupId}/${username}`)

export {
  fetchModuleAssignment, createGroupAssignment, createIndividualAssignment, deleteAssignment,
  joinAssignmentGroup, leaveAssignmentGroup,
}; // eslint-disable-line
