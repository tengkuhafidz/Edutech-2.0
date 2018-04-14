import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

/**
 * Horizontal steppers are ideal when the contents of one step depend on an earlier step.
 * Avoid using long step names in horizontal steppers.
 *
 * Linear steppers require users to complete one step in order to move on to the next.
 */
class TestStepper extends React.Component {
  state = {
    finished: false,
    stepIndex: 0,
  }
  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
              <Row className="calendarDateFormField">
                <Col md={6}>
                  <ControlLabel>From</ControlLabel>
                  <DateTimePicker
                    defaultValue={new Date(scheduleStart)}
                    onChange={handleStartChange}
                  />
                </Col>
                <Col md={6}>
                  <ControlLabel>To</ControlLabel>
                  <DateTimePicker
                    defaultValue={new Date(scheduleEnd)}
                    onChange={handleEndChange}
                  />
                </Col>
              </Row>
              <Row className="calendarFormField">
                <Col md={12}>
                    <ControlLabel>Location</ControlLabel>
                    <Autosuggest
                      value={scheduleLocation}
                      datalist={JSON.parse(localStorage.getItem('NUSVenues'))}
                      placeholder="Enter schedule location"
                      onChange={handleLocationChange}
                    />
                </Col>
              </Row>
              <Row className="calendarFormField">
                <Col md={12}>
                    <ControlLabel>Title</ControlLabel>
                    <FormControl
                      type="text"
                      value={scheduleTitle}
                      placeholder="Enter schedule title"
                      onChange={handleTitleChange}
                    />
                </Col>
              </Row>
              <Row className="calendarFormField">
                <Col md={12}>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl
                      type="text"
                      value={scheduleDescription}
                      placeholder="Enter schedule description"
                      onChange={handleDescriptionChange}
                    />
                </Col>
              </Row>
          </div>
        );
      case 1:
        return 'What is an ad group anyways?';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }
  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }
  handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }
  render() {
    const { finished, stepIndex } = this.state;
    const contentStyle = { margin: '0 16px' };

    return (
      <div style={{ width: '100%', maxWidth: 700, margin: 'auto' }}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Select campaign settings</StepLabel>
          </Step>
          <Step>
            <StepLabel>Create an ad group</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
            <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{ marginTop: 12 }}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={() => this.handlePrev()}
                  style={{ marginRight: 12 }}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={() => this.handleNext()}
                />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default TestStepper;
