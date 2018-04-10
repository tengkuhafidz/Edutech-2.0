import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import moment from 'moment';

import LessonStore from '../../../../stores/LessonStore/LessonStore';

@observer
class DownloadAllFileBtn extends Component {

	downloadAllFiles() {
		const { title, startDate } = this.props.lesson;
		const dateTimeFormat = moment(startDate).format('Do MMMM');
		const { lessonId } = this.props;
		LessonStore.downloadAllFiles(lessonId, title, dateTimeFormat);
	}

	render() {
		return (
			<div>
				<Button className="pull-right" block onClick={() => this.downloadAllFiles()}>Download All Attachments</Button>
			</div>
		)
	}
}

export default DownloadAllFileBtn;
