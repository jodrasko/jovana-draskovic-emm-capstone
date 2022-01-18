import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfile from "./components/EditProfile/EditProfile";
import PhysicianList from "./pages/PhysicianList/PhysicianList";
import EditPhysician from "./components/EditPhysician/EditPhysician";
import MedicationList from "./pages/MedicationList/MedicationList";
import NoteList from "./pages/NoteList/NoteList";

import MainList from "./pages/MainList/MainList";

// BrainFlix Application
class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/edit-profile" component={EditProfile} />\
            <Route path="/physicians" component={PhysicianList} />
            <Route
              path="/edit-physician/:physicianId"
              component={EditPhysician}
            />
            <Route path="/add-physician" component={EditPhysician} />
            <Route path="/medications" component={MedicationList} />
            <Route path="/notes" component={NoteList} />
            <Route path="/main-list" component={MainList} />
            {/* <Route
              path="/videos/:videoId"
              render={(routerProps) => {
                return <MainPage {...routerProps} />;
              }} */}
            {/* /> */}
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
