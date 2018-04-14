
import { observable, action, computed, toJS } from 'mobx';
import { Minute } from './Minute';
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';

import { getOneMinute, createMeetingMinute, createAgenda, updateAgenda, deleteAgenda } from '../../services/meetingApi';
import MeetingStore from './MeetingStore';

class MinuteStore {
	@observable minuteList = [];
	@observable agendaList = [];


	@action
	async getOneMeetingMinute(minuteId) {
		try {
			const res = await getOneMinute(minuteId);
			console.log('getOneMeetingMinute', res.data);
		} catch (e) {
			console.log(e);
		}
	}


	@action
	async addMeetingMinute(meetingId, startTime, endTime, attendees) {
		const attendeesObj = [];
		const meeting = { id: meetingId }
		const createdAt = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
		startTime = moment(startTime).format('YYYY-MM-DDTHH:mm:ss');
		endTime = moment(endTime).format('YYYY-MM-DDTHH:mm:ss');
		attendees.forEach((attendee, index) => {
			attendeesObj[index] = { username: attendee };
		})
		const meetingminute = new Minute(meeting, startTime, endTime, attendeesObj, [], createdAt, [])
		try {
			const res = await createMeetingMinute(meetingminute);
			swal('Success!', 'Meeting Minute updated successfully.', 'success');
			this.minuteList = res.data;
		} catch (e) {
			console.log(e);
		}
	}

	@action
	async addAgenda(meetingMinuteId, agenda, groupId) {
		console.log('agenda in minute store', agenda)
		try {
			const minute = await createAgenda(meetingMinuteId, agenda);
			MeetingStore.populateMeetings(groupId);
			swal('Success!', 'Agenda created successfully.', 'success');
		} catch (e) {
			console.log(e)
		}
	}

	@action
	async updateAgenda(meetingMinuteId, agenda, groupId) {
		console.log('update agenda in minute store', agenda);
		try {
			await updateAgenda(meetingMinuteId, agenda);
			MeetingStore.populateMeetings(groupId);
			swal('Success!', 'Updated Agenda successfully.', 'success');
		} catch (e) {
			console.log(e)
		}
	}

	@action
	async deleteAgenda(agendaId, groupId) {
		try {
			const res = await deleteAgenda(agendaId);
			MeetingStore.populateMeetings(groupId);
			swal('Success!', 'Agenda removed successfully!', 'success');
			console.log(res.data);
		} catch (e) {
			console.log(e)
		}
	}
}


export default new MinuteStore;
