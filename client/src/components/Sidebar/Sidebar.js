// import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "./Sidebar.scss";
import MenuIcon from "../../assets/images/Icons/menu_black_24dp.svg";
import MedicationIcon from "../../assets/images/Icons/medicines.svg";
import ProfileIcon from "../../assets/images/Icons/ui_user_profile.svg";
import PhysicianIcon from "../../assets/images/Icons/doctor.svg";
import NoteIcon from "../../assets/images/Icons/notes.svg";
import EmmLogo from "../../assets/images/Icons/logo.svg";

class Sidebar extends Component {
  state = {
    expand: false,
    isRedirectToProfile: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isRedirectToProfile !== prevState.isRedirectToProfile) {
      this.setState((prevState) => ({
        isRedirectToProfile: false
      }));
    }
  }

  handleClick = (e) => {
    e.preventDefault();
    console.log("handleClick");
    this.toggleHide();
  };

  handleLogoClick = (e) => {
    e.preventDefault();
    // this.props.history.push("/profile");
    // this.setState({ isRedirectToProfile: true });
    this.setState((prevState) => ({
      isRedirectToProfile: true
    }));
  };

  // toggleHide() {
  //   this.setState({ expand: !this.state.expand });
  // }
  toggleHide = () => {
    this.setState((prevState) => ({
      expand: !prevState.expand
    }));
  };

  render() {
    console.log("expand", this.state.expand);
    console.log("isRedirectToProfile", this.state.isRedirectToProfile);
    if (this.state.isRedirectToProfile) {
      return <Redirect to="/profile" />;
    }
    return (
      <>
        <div className="sidebar-box">
          <div className="sidebar-box__heading">
            <img
              src={EmmLogo}
              className="sidebar-box__logo"
              alt="emm logo"
              onClick={this.handleLogoClick}
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
                <Link to="/profile" className="sidebar-box__link">
                  <img
                    src={ProfileIcon}
                    className="sidebar-box__symbol"
                    alt="profile icon"
                    onClick={this.handleClick}
                  />
                  <span className="sidebar-box__menu-item">Profile</span>
                </Link>
              </li>
              <li className="sidebar-box__item">
                <Link to="/physicians" className="sidebar-box__link">
                  <img
                    src={PhysicianIcon}
                    className="sidebar-box__symbol"
                    alt="physician icon"
                    onClick={this.handleClick}
                  />
                  <span className="sidebar-box__menu-item">Physicians</span>
                </Link>
              </li>
              <li className="sidebar-box__item">
                <Link to="/medications" className="sidebar-box__link">
                  <img
                    src={MedicationIcon}
                    className="sidebar-box__symbol"
                    alt="medicine icon"
                    onClick={this.handleClick}
                  />
                  <span className="sidebar-box__menu-item">Medications</span>
                </Link>
              </li>
              <li className="sidebar-box__item">
                <Link to="/notes" className="sidebar-box__link">
                  <img
                    src={NoteIcon}
                    className="sidebar-box__symbol"
                    alt="note icon"
                    onClick={this.handleClick}
                  />
                  <span className="sidebar-box__menu-item">Notes</span>
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
