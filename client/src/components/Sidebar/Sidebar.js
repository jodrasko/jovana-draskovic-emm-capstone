// import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import "./Sidebar.scss";
import MenuIcon from "../../assets/images/Icons/menu_black_24dp.svg";
import MedicationIcon from "../../assets/images/Icons/medicines.svg";
import ProfileIcon from "../../assets/images/Icons/ui_user_profile.svg";
import PhysicianIcon from "../../assets/images/Icons/doctor.svg";
import NoteIcon from "../../assets/images/Icons/notes.svg";
import LogoutIcon from "../../assets/images/Icons/logout.svg";
import EmmLogo from "../../assets/images/Icons/logo.svg";

const Sidebar = () => {
  const [expand, setExpand] = useState(false);
  const [isRedirectToProfile, setIsRedirectToProfile] = useState(false);

  const handleClickLogout = (e) => {
    e.preventDefault();
    toggleHide();
    sessionStorage.setItem("token", "");
    sessionStorage.setItem("profileId", "");
    setIsRedirectToProfile(true);
  };

  const handleClick = (e) => {
    e.preventDefault();
    toggleHide();
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setIsRedirectToProfile(true);
  };

  const toggleHide = () => {
    setExpand(!expand);
  };

  useEffect(() => {
    setIsRedirectToProfile(false);
  }, [isRedirectToProfile]);

  if (isRedirectToProfile) {
    return <Redirect to="/" />;
  }

  return (
    <div className="sidebar-box">
      <div className="sidebar-box__heading">
        <img
          src={EmmLogo}
          className="sidebar-box__logo"
          alt="emm logo"
          onClick={handleLogoClick}
        />
        <img
          src={MenuIcon}
          className="sidebar-box__icon"
          alt="menu icon"
          onClick={handleClick}
        />
      </div>
      <div className={expand ? "" : "hide"}>
        <ul className="sidebar-box__list">
          <li className="sidebar-box__item">
            <Link to="/profile" className="sidebar-box__link">
              <img
                src={ProfileIcon}
                className="sidebar-box__symbol"
                alt="profile icon"
                onClick={handleClick}
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
                onClick={handleClick}
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
                onClick={handleClick}
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
                onClick={handleClick}
              />
              <span className="sidebar-box__menu-item">Notes</span>
            </Link>
          </li>
          <li className="sidebar-box__item">
            <Link
              to="/"
              className="sidebar-box__link"
              onClick={handleClickLogout}
            >
              <img
                src={LogoutIcon}
                className="sidebar-box__symbol"
                alt="logout icon"
              />
              <span className="sidebar-box__menu-item">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
