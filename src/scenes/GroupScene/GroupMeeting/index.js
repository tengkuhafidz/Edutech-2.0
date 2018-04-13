import React, {Component} from 'react';
import { Paper } from 'material-ui';
import {observer} from 'mobx-react';
import {toJS} from 'mobx';
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';
import { Tabs, Tab, Col, Row, Button, Glyphicon, Checkbox } from 'react-bootstrap';
import { DateTimePicker, DropdownList } from 'react-widgets';
import momentLocalizer from 'react-widgets-moment';
import './styles.css';
import 'react-widgets/dist/css/react-widgets.css';

import MeetingCard from './MeetingCard';
import MergeCalendar from './MergeCalendar';
import GroupScheduleItemStore from '../../../stores/ScheduleItemStore/GroupScheduleItemStore';
import MeetingStore from '../../../stores/MeetingStore/MeetingStore';
import GroupStore from '../../../stores/GroupStore/GroupStore';
import ScheduleItemStore from '../../../stores/ScheduleItemStore/ScheduleItemStore';
import GroupCalendar from '../GroupCalendar';

moment.locale('en');
momentLocalizer();

@observer
class GroupMeeting extends Component{

  constructor(props){
      super(props);
      this.state = {
        checked: false,
        viewAll : false,
        title: null,
        description: null,
        location: null,
        startTime: new Date(),
        endTime: new Date(),
        showMeetingForm: false
      }
  }

  checkSelectedDateValid(startTime , endTime){
    let membersScheduleItems = toJS(ScheduleItemStore.userGroupScheduleItems);
    for(var i=0 ; i<membersScheduleItems.length ; i++){
      let memberStart = new Date(membersScheduleItems[i].startDate);
      let memnberEnd = new Date(membersScheduleItems[i].endDate);
      if((startTime>memberStart && startTime<memnberEnd) || (endTime>memberStart && endTime<memnberEnd)){
        // console.log("1 selected: ",startTime, endTime)
        // console.log("1 member: ", memberStart, memnberEnd)
        swal("Warning!", "Your chosen time is clashing with your member schedule.", "warning");
        return false;
      }else if(memberStart>startTime && memberStart<endTime){
        // console.log("2 selected: ",startTime, endTime)
        // console.log("2 member: ", memberStart, memnberEnd)
        swal("Warning!", "Your chosen time is clashing with your member schedule.", "warning");
        return false;
      }
    }
    return true;
  }

  addMeetingItem(){
    var title = this.state.title;
    var description = this.state.description;
    var startTime = this.state.startTime;
    var endTime = this.state.endTime;
    var location = this.state.location;
    var groupId = this.props.groupId;
    var type = "meeting";

    if(this.state.checked){
      MeetingStore.addMeeting(title, description, startTime, endTime, location, groupId, type);
      if(MeetingStore.addFormSuccess)
        this.setState({showMeetingForm: false})
    } else{
      var valid = this.checkSelectedDateValid(startTime, endTime);
      if(valid){
        MeetingStore.addMeeting(title, description, startTime, endTime, location, groupId, type);
        if(MeetingStore.addFormSuccess)
          this.setState({showMeetingForm: false})
      }
    }

  }

  closeMeetingForm(){
    // MeetingStore.addFormSuccess = false;
    this.setState({showMeetingForm: false})
  }

  renderMeetingInput() {
    return (
      <Paper className="paperDefault">
          <div className="text-right" >
              <i className="fas fa-times fa-1x btnHover" onClick={this.closeMeetingForm.bind(this)}></i>
            </div>
          <GroupCalendar step={60} />
      </Paper>
    );
  }

  handleChecked(event){
    this.setState({checked: event.target.checked})
  }

  meetingFormShow(){
    MeetingStore.addFormSuccess = false;
    this.setState({showMeetingForm: true})
  }

  renderCreateButton(){
    let meetingsObservable = MeetingStore.meetings;
    var meetings = toJS(meetingsObservable);
    const groupMeetings = GroupScheduleItemStore.meetingItems;
    console.log('meetings', meetings)

    return (
      <div>
        <Button bsStyle="primary" onClick ={this.meetingFormShow.bind(this)}>
          Create Meeting
          <Glyphicon glyph="plus" style={{marginLeft: '5px'}}/>
        </Button>
        {
            groupMeetings.map((meeting, index) =>{

              return (<MeetingCard key={meeting.id} meeting={meeting} groupId={this.props.groupId}/>);
            })
        }
      </div>
      )
  }


  render(){
    console.log("checkbox condition", this.state.checked)
    return(
      <div className="standardTopGap">
        {this.state.showMeetingForm ? this.renderMeetingInput() : this.renderCreateButton() }
      </div>
    )
  }
}

export default GroupMeeting;
