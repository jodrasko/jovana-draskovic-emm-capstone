import { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfile from "./components/EditProfile/EditProfile";
import PhysicianList from "./pages/PhysicianList/PhysicianList";
import MedicationList from "./pages/MedicationList/MedicationList";
import NoteList from "./pages/NoteList/NoteList";

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
            <Route path="/medications" component={MedicationList} />
            <Route path="/notes" component={NoteList} />
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
