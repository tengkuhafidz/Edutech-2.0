import axios from 'axios';

const findUserGroups = async username => axios.get(`/group/user/${username}`);

export { findUserGroups }; // eslint-disable-line
