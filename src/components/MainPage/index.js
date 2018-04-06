import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeScene from '../../scenes/HomeScene';
import ModuleScene from '../../scenes/ModuleScene';
import GroupScene from '../../scenes/GroupScene';
import MyScheduleScene from '../../scenes/MyScheduleScene';
import MyTasksScene from '../../scenes/MyTasksScene';
import TopBar from './TopBar';
import LeftBar from './LeftBar';

const MainPage = () => (
  <div className="App">
    <TopBar />
    <Switch>
      <Route exact path="/" render={() => <LeftBar scene="home" />} />
      <Route exact path="/module/:moduleCode" render={() => <LeftBar scene="module" />} />
      <Route exact path="/group/:groupId" render={() => <LeftBar scene="group" />} />
      <LeftBar scene="home" />
    </Switch>
    <div className="mainContent">
      <Switch>
        <Route exact path="/" component={HomeScene} />
        <Route exact path="/module/:moduleCode" component={ModuleScene} />
        <Route exact path="/group/:groupId" component={GroupScene} />
        <Route exact path="/myschedule" component={MyScheduleScene} />
        <Route exact path="/mytasks" component={MyTasksScene} />
      </Switch>
    </div>
  </div>
);


export default MainPage;
