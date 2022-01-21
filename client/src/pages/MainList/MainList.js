import { Component } from "react";
import "./MainList.scss";
import Sidebar from "../../components/Sidebar/Sidebar";

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
