import React, { Component } from 'react';
import { RaisedButton, TextField } from 'material-ui';
import { captureTyping, sendMessage } from '../../../../services/socketApi';

const containerStyle = {
	width: '90%',
	margin: '8px auto',
}

const buttonStyle = {
	marginTop: '16px'
}

export default class ChatTypeField extends Component {

	constructor() {
		super();
		this.state = {
			name: '',
			message: ''
		}
	}

	handleChange(e) {
		let newState = {};
		 newState[e.target.name] = e.target.value;
		 this.setState(newState);
	}

	handleKeyPress(e) {
		captureTyping(localStorage.getItem('username'));
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("name: ", this.state.name, ". message: ", this.state.message)
		sendMessage({
			name: localStorage.getItem('username'),
	    message: this.state.message
		})
	    this.setState({message: ''});
	}

	render() {
		return (
		  <div style={containerStyle}>
		  	<form onSubmit={this.handleSubmit.bind(this)}>
			    <TextField
			      name="message"
			      hintText="Message"
			      fullWidth={true}
			      value={this.state.message}
			      onChange={this.handleChange.bind(this)}
			      onKeyPress={this.handleKeyPress.bind(this)}
			    />
			    <RaisedButton type="submit" label="Send Message" fullWidth={true} style={buttonStyle} primary={true}/>
		  	</form>
		  </div>
		);
	}
}
