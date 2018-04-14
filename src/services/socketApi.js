import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const sendMessage = (message) => {
	socket.emit('chat', message);
};

const captureTyping = (typer) => {
	socket.emit('typing', typer);
};

const joinRoom = (meetingId) => {
	socket.emit('join', meetingId, localStorage.getItem('username'), (err) => {
		if (err) {
			window.location.href('/');
		} else {
			console.log('success');
		}
	});
};

export { socket, captureTyping, sendMessage, joinRoom };
