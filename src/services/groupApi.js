import axios from 'axios';

const findUserGroups = async username => axios.get(`/group/user/${username}`);

const findGroup = async id => axios.get(`/group/${id}`);

export { findUserGroups, findGroup }; // eslint-disable-line
