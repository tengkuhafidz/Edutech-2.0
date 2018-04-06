import axios from 'axios';

const findGroupMeetingItems = async groupId => axios.get(`/scheduleitem/group/${groupId}`);

const createMeetingItem = async meetingItem => axios.post('/scheduleitem', meetingItem);

const editMeetingItem = async id => axios.delete(`/scheduleitem/${id}`);

const deleteMeetingItem = async id => axios.delete(`/scheduleitem/${id}`);

export {
  findGroupMeetingItems, createMeetingItem,
  editMeetingItem, deleteMeetingItem,
 };
