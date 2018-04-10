import React, { Component } from 'react';
import { ListGroupItem, Button, ButtonToolbar } from 'react-bootstrap';
import { observer } from 'mobx-react';
import swal from 'sweetalert';

import LessonStore from '../../../../stores/LessonStore/LessonStore';

import './styles.css';

@observer
class DownloadSingleFile extends Component {

	downloadFile() {
		const { id, fileName } = this.props.file;
		const { lessonId } = this.props;
		LessonStore.downloadOneFile(lessonId, id, fileName);
	}

	removeFile() {
		const { lessonId } = this.props;
		const { id, fileName } = this.props.file;

		swal({
		  title: 'Are you sure?',
		  text: 'You will not be able to recover this file!',
		  icon: 'warning',
		  buttons: true,
		  dangerMode: true,
		})
		.then((willDelete) => {
		  if (willDelete) {
				LessonStore.removeOneFile(lessonId, id, fileName);
		  }
		});
	}

	renderRemoveBtn() {
		const userType = localStorage.getItem('userType');
		if (userType === 'instructor') {
			return (
				<Button bsStyle="warning" bsSize="xsmall" onClick={this.removeFile.bind(this)}>
					Delete
				</Button>
			)
		}
		return (<span></span>);
	}

	render() {
		const { file } = this.props;

		return (
				<ListGroupItem bsStyle="info">
				{file.fileName}
				<div className="pull-right" style={{ marginBottom: '20px' }}>
					<ButtonToolbar className="pull-right">
								<Button bsStyle="primary" bsSize="xsmall" onClick={ this.downloadFile.bind(this) }>
					      Download
					 		</Button>
					    {this.renderRemoveBtn()}
					</ButtonToolbar>
				</div>
				<p className="smallText" style={{ color: '#000000' }}>{ file.title }</p>
		  </ListGroupItem>
		)
	}
}

export default DownloadSingleFile;
