// import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
// import { Redirect } from "react-router";
// import "./LoginPage.scss";

// const baseUrl = "http://localhost:8080";
// const signupUrl = `${baseUrl}/signup`;

class Sidebar extends Component {
  render() {
    return (
      <>
        <ul className="sidebar-list">
          <li className="sidebar-list__item">
            <Link to="/edit-profile">Profile</Link>
          </li>
          <li className="sidebar-list__item">
            <Link to="/physicians">Physician Information</Link>
          </li>
          <li className="sidebar-list__item">
            <Link to="/medications">Medication</Link>
          </li>
          <li className="sidebar-list__item">
            <Link to="/notes">Notes/Consults</Link>
          </li>
        </ul>
      </>
    );
  }
}

export default Sidebar;
