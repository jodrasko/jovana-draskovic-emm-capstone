import EmmLogo from "../../assets/images/Icons/logo.svg";
import "../Header/Header.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../components/Header/Header.scss";

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__box">
          <Link to="/profile" className="header__link">
            <img src={EmmLogo} alt="eMM logo" className="header__logo" />
          </Link>
          {/* 
          <img
              src={EmmLogo}
              className="sidebar-box__logo"
              alt="emm logo"
              onClick={this.handleClick}
            /> */}
        </div>
      </header>
    );
  }
}

export default Header;
