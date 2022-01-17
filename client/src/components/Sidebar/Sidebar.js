// import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import MenuIcon from "../../assets/images/Icons/menu_black_24dp.svg";

// import { Redirect } from "react-router";
// import "./LoginPage.scss";

// const baseUrl = "http://localhost:8080";
// const signupUrl = `${baseUrl}/signup`;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      expand: true
    });
  };

  render() {
    return (
      <>
        <div className="sidebar-box">
          <img src={MenuIcon} alt="menu icon" onClick={this.handleClick} />
          <ul className="sidebar-box__list">
            <li className="sidebar-box__item">
              <Link to="/profile" className="no-underline">
                Profile
              </Link>
            </li>
            <li className="sidebar-box__item">
              <Link to="/physicians" className="no-underline">
                Physicians
              </Link>
            </li>
            <li className="sidebar-box__item">
              <Link to="/medications" className="no-underline">
                Medications
              </Link>
            </li>
            <li className="sidebar-box__item">
              <Link to="/notes" className="no-underline">
                Notes/Consults
              </Link>
            </li>
          </ul>
        </div>
      </>
    );
  }
}

export default Sidebar;
