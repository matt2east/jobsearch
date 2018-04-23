import React, { Component } from 'react';
// import {
  // BrowserRouter as Router,
  // Link,
  // Route,
  // Switch,
// } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import NotFound from './components/NotFound';
import Callback from './components/Callback';
import StudentPost from './components/StudentPost';
import EmployerPost from './components/EmployerPost';
import RecruiterPost from './components/RecruiterPost';
// import UploadResume from './components/UploadResume';
import ChooseAccountType from './components/ChooseAccountType';
import PassportTest from './components/PassportTest';
import JobsPost from './components/JobsPost';
import JobsGet from './components/JobsGet';

class App extends Component {
  render() {
    let mainComponent = "";
    switch (this.props.location){
      case "":
        mainComponent = <LandingPage {...this.props}/>;
        break;
      case "jobs/post":
        mainComponent = <JobsPost/>;
        break;
      case "jobs/get":
        mainComponent = <JobsGet/>;
        break;
      case "student/post":
        mainComponent = this.props.auth.isAuthenticated() ? <StudentPost {...this.props}/> : <NotFound />
        break;
      case "employer/post":
        mainComponent = this.props.auth.isAuthenticated() ? <EmployerPost {...this.props}/> : <NotFound />
        break;
      case "recruiter/post":
        mainComponent = this.props.auth.isAuthenticated() ? <RecruiterPost {...this.props}/> : <NotFound />
        break;
      case "callback":
        mainComponent = <Callback />;
        break;
      case "passport":
        mainComponent = <PassportTest />;
        break;
      case "signup":
        mainComponent = this.props.auth.isAuthenticated() ? <ChooseAccountType {...this.props}/> : <NotFound />;
        break;
        default:
      mainComponent = <NotFound />;
    }
    return (
      <div className="App">
        <h1 className="App-title">{this.props.name}.</h1>
        {mainComponent}
        {/*<Router>
       <Switch>
         <Route exact path="/" component={LandingPage} />
         <Route exact path="/student/profile" component={SignupForm} />
         <Route exact path="/employer/profile" component={EmployerSignupForm} />
        </Switch>
        </Router>*/}
      </div>
    );
  }
}

export default App;
