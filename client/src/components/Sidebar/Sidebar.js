// import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.scss";
import MenuIcon from "../../assets/images/Icons/menu_black_24dp.svg";

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
          <img
            src={MenuIcon}
            className="sidebar-box__icon"
            alt="menu icon"
            onClick={this.handleClick}
          />
          <div className={this.state.expand ? "" : "hide"}>
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
