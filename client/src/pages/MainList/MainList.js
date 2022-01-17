// import axios from "axios";
import { Component } from "react";
// import { Link } from "react-router-dom";
// import { Redirect } from "react-router";
import "./MainList.scss";
import Sidebar from "../../components/Sidebar/Sidebar";

// const baseUrl = "http://localhost:8080";
// const signupUrl = `${baseUrl}/signup`;

class MainList extends Component {
  render() {
    return (
      <>
        <h1>Main List Page</h1>
        <div className="main-list">
          <Sidebar />
        </div>
      </>
    );
  }
}

export default MainList;
