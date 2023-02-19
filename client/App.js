import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
function App() {
  return (
    <Router>
      {/* <Switch> */}
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route path="/login" component={LoginPage} />

      <Route path="/signup">
        <SignupPage />
      </Route>
      <Route path="/profile" component={ProfilePage} />

      <Route path="/edit-profile/:profileId" component={EditProfile} />

      <Route path="/physicians">
        <PhysicianList />
      </Route>
      <Route path="/edit-physician/:physicianId">
        <EditPhysician />
      </Route>
      <Route path="/add-physician">
        <EditPhysician />
      </Route>
      <Route path="/medications">
        <MedicationList />
      </Route>
      <Route path="/add-medication">
        <EditMedication />
      </Route>
      <Route path="/edit-medication/:medicationId">
        <EditMedication />
      </Route>

      <Route path="/notes">
        <NoteList />
      </Route>
      <Route path="/add-note">
        <EditNote />
      </Route>
      <Route path="/edit-note/:noteId">
        <EditNote />
      </Route>
      {/* </Switch> */}
    </Router>
  );
}

export default App;
