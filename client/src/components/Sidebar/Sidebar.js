// import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import MenuIcon from "../../assets/images/Icons/menu_black_24dp.svg";
import MedicationIcon from "../../assets/images/Icons/medicines.svg";
import ProfileIcon from "../../assets/images/Icons/ui_user_profile.svg";
import PhysicianIcon from "../../assets/images/Icons/doctor.svg";
import NoteIcon from "../../assets/images/Icons/notes.svg";
import EmmLogo from "../../assets/images/Icons/logo.svg";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };

    this.toggleHide = this.toggleHide.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log("handleClick");
    this.toggleHide();
  };

  toggleHide() {
    this.setState({ expand: !this.state.expand });
  }

  render() {
    console.log("expand", this.state.expand);
    return (
      <>
        <div className="sidebar-box">
          <div className="sidebar-box__heading">
            <img
              src={EmmLogo}
              className="sidebar-box__logo"
              alt="emm logo"
              onClick={this.handleClick}
            />
            <img
              src={MenuIcon}
              className="sidebar-box__icon"
              alt="menu icon"
              onClick={this.handleClick}
            />
          </div>
          <div className={this.state.expand ? "" : "hide"}>
            <ul className="sidebar-box__list">
              <li className="sidebar-box__item">
                <Link to="/profile" className="no-underline">
                  <img
                    src={ProfileIcon}
                    className="sidebar-box__icon"
                    alt="profile icon"
                    onClick={this.handleClick}
                  />
                  Profile
                </Link>
              </li>
              <li className="sidebar-box__item">
                <Link to="/physicians" className="no-underline">
                  <img
                    src={PhysicianIcon}
                    className="sidebar-box__icon"
                    alt="physician icon"
                    onClick={this.handleClick}
                  />
                  Physicians
                </Link>
              </li>
              <li className="sidebar-box__item">
                <Link to="/medications" className="no-underline">
                  <img
                    src={MedicationIcon}
                    className="sidebar-box__icon"
                    alt="medicine icon"
                    onClick={this.handleClick}
                  />
                  Medications
                </Link>
              </li>
              <li className="sidebar-box__item">
                <Link to="/notes" className="no-underline">
                  <img
                    src={NoteIcon}
                    className="sidebar-box__icon"
                    alt="note icon"
                    onClick={this.handleClick}
                  />
                  Notes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Sidebar;
