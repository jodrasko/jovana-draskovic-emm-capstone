import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfile from "./pages/EditProfile/EditProfile";
import PhysicianList from "./pages/PhysicianList/PhysicianList";
import EditPhysician from "./pages/EditPhysician/EditPhysician";
import MedicationList from "./pages/MedicationList/MedicationList";
import EditMedication from "./pages/EditMedication/EditMedication";
import NoteList from "./pages/NoteList/NoteList";
import EditNote from "./pages/EditNote/EditNote";
import MainPage from "./pages/MainPage/MainPage";

// eMM Web Application
class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={MainPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/edit-profile" component={EditProfile} />
            <Route path="/physicians" component={PhysicianList} />
            <Route
              path="/edit-physician/:physicianId"
              component={EditPhysician}
            />
            <Route path="/add-physician" component={EditPhysician} />
            <Route path="/medications" component={MedicationList} />
            <Route path="/add-medication" component={EditMedication} />
            <Route
              path="/edit-medication/:medicationId"
              component={EditMedication}
            />
            <Route path="/notes" component={NoteList} />
            <Route path="/add-note" component={EditNote} />
            <Route path="/edit-note/:noteId" component={EditNote} />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
